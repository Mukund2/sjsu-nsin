# Orbit — shot 1 of the journey: satellite drifts into view over the rotating Earth.
# Per blender-cinematic-fx §1/§2/§3/§7 + HANDOFF Blender 5.1 traps.
# PREVIEW=1 -> single still (frame 120) at half res; else 240-frame PNG sequence.
import bpy, math, os, random
from mathutils import Vector, Matrix

PREVIEW = os.environ.get("PREVIEW") == "1"
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(HERE, "out")
os.makedirs(OUT, exist_ok=True)

DAYMAP = os.path.join(ROOT, "public", "images", "earth", "2k_earth_daymap.jpg")
NIGHTMAP = os.path.join(ROOT, "public", "images", "earth", "2k_earth_nightmap.jpg")
SAT_GLB = os.path.join(ROOT, "public", "models", "satellite.glb")

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
# 5.1 trap: Action.fcurves is gone — set interpolation pref BEFORE keyframing
bpy.context.preferences.edit.keyframe_new_interpolation_type = 'LINEAR'

# engine — Blender 5.x id (cinematic-fx §7)
try:
    scene.render.engine = 'BLENDER_EEVEE_NEXT'
except TypeError:
    scene.render.engine = 'BLENDER_EEVEE'

# color: AgX keeps sun glints on the panels unclipped (§2)
scene.view_settings.view_transform = 'AgX'
try:
    scene.view_settings.look = 'AgX - Punchy'
except TypeError:
    pass
scene.view_settings.exposure = 0.0
scene.frame_start, scene.frame_end = 1, 240


def aim_at(obj, target):
    d = (Vector(target) - obj.location).normalized()
    obj.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()


# ── world: black space, faint ambient ──
world = bpy.data.worlds.new("Space")
scene.world = world
world.use_nodes = True
wnt = world.node_tree
wnt.nodes.clear()
wbg = wnt.nodes.new("ShaderNodeBackground")
wbg.inputs['Color'].default_value = (0.004, 0.005, 0.008, 1)
wbg.inputs['Strength'].default_value = 1.0
wout = wnt.nodes.new("ShaderNodeOutputWorld")
wnt.links.new(wbg.outputs['Background'], wout.inputs['Surface'])

# ── starfield: 1400 paper-colored points on a radius-300 shell (one mesh) ──
random.seed(11)
verts, faces = [], []
for i in range(1400):
    z = random.uniform(-1, 1)
    a = random.uniform(0, 2 * math.pi)
    rr = math.sqrt(max(0.0, 1 - z * z))
    d = Vector((rr * math.cos(a), rr * math.sin(a), z))
    p = d * 300.0
    s = random.uniform(0.35, 0.95)
    up = Vector((0, 0, 1)) if abs(d.z) < 0.9 else Vector((1, 0, 0))
    t1 = d.cross(up).normalized()
    t2 = d.cross(t1).normalized()
    b = len(verts)
    verts += [p + t1 * s,
              p + (-0.5 * t1 + 0.866 * t2) * s,
              p + (-0.5 * t1 - 0.866 * t2) * s]
    faces.append((b, b + 1, b + 2))
smesh = bpy.data.meshes.new("Stars")
smesh.from_pydata(verts, [], faces)
smesh.update()
stars = bpy.data.objects.new("Stars", smesh)
bpy.context.collection.objects.link(stars)
smat = bpy.data.materials.new("StarMat")
smat.use_nodes = True
snt = smat.node_tree
snt.nodes.clear()
sem = snt.nodes.new("ShaderNodeEmission")
sem.inputs['Color'].default_value = (0.949, 0.929, 0.890, 1)  # paper #F2EDE3
sem.inputs['Strength'].default_value = 2.5
sout = snt.nodes.new("ShaderNodeOutputMaterial")
snt.links.new(sem.outputs['Emission'], sout.inputs['Surface'])
smesh.materials.append(smat)

# ── Earth: radius 30, upper limb in the bottom ~35% of frame ──
bpy.ops.mesh.primitive_uv_sphere_add(segments=96, ring_count=48, radius=30)
earth = bpy.context.active_object
earth.name = "Earth"
bpy.ops.object.shade_smooth()
earth.location = (0, -40, -30)
# tilt so the camera sees mid-latitudes, then spin about the (local) pole:
# ZYX euler -> z applied first (innermost) = clean spin about the tilted pole
earth.rotation_mode = 'ZYX'
earth.rotation_euler = (math.radians(37), 0, 0)
earth.rotation_euler[2] = 0.0
earth.keyframe_insert('rotation_euler', index=2, frame=1)
earth.rotation_euler[2] = 0.25
earth.keyframe_insert('rotation_euler', index=2, frame=240)

emat = bpy.data.materials.new("EarthMat")
emat.use_nodes = True
ent = emat.node_tree
ebsdf = ent.nodes["Principled BSDF"]
day = ent.nodes.new("ShaderNodeTexImage")
day.image = bpy.data.images.load(DAYMAP)
night = ent.nodes.new("ShaderNodeTexImage")
night.image = bpy.data.images.load(NIGHTMAP)
# EarthDive.astro: emissive 0xffc88a (1.0, 0.78, 0.54), intensity 0.55
tintmul = ent.nodes.new("ShaderNodeVectorMath")
tintmul.operation = 'MULTIPLY'
tintmul.inputs[1].default_value = (1.0, 0.78, 0.54)
ent.links.new(day.outputs['Color'], ebsdf.inputs['Base Color'])
ent.links.new(night.outputs['Color'], tintmul.inputs[0])
ent.links.new(tintmul.outputs['Vector'], ebsdf.inputs['Emission Color'])
ebsdf.inputs['Emission Strength'].default_value = 0.55
ebsdf.inputs['Roughness'].default_value = 0.85
ebsdf.inputs['Metallic'].default_value = 0.0
earth.data.materials.append(emat)

# gold fresnel rim on the limb — BackSide-style emission shell, slightly larger
bpy.ops.mesh.primitive_uv_sphere_add(segments=96, ring_count=48, radius=30.4)
rim = bpy.context.active_object
rim.name = "Atmosphere"
bpy.ops.object.shade_smooth()
rim.location = earth.location
rmat = bpy.data.materials.new("RimGlow")
rmat.use_nodes = True
rnt = rmat.node_tree
rnt.nodes.clear()
lw = rnt.nodes.new("ShaderNodeLayerWeight")
lw.inputs['Blend'].default_value = 0.5
pw = rnt.nodes.new("ShaderNodeMath")
pw.operation = 'POWER'
pw.inputs[1].default_value = 10.0
rem = rnt.nodes.new("ShaderNodeEmission")
rem.inputs['Color'].default_value = (0.788, 0.663, 0.345, 1)  # gold #C9A958
rem.inputs['Strength'].default_value = 1.8
rtr = rnt.nodes.new("ShaderNodeBsdfTransparent")
rmix = rnt.nodes.new("ShaderNodeMixShader")
rout = rnt.nodes.new("ShaderNodeOutputMaterial")
rnt.links.new(lw.outputs['Facing'], pw.inputs[0])
rnt.links.new(pw.outputs['Value'], rmix.inputs['Fac'])
rnt.links.new(rtr.outputs['BSDF'], rmix.inputs[1])
rnt.links.new(rem.outputs['Emission'], rmix.inputs[2])
rnt.links.new(rmix.outputs['Shader'], rout.inputs['Surface'])
try:
    rmat.surface_render_method = 'BLENDED'   # EEVEE Next / 5.x
except AttributeError:
    rmat.blend_method = 'HASHED'             # legacy
rim.data.materials.append(rmat)

# ── the satellite: NASA Voyager GLB, recentered + scaled to ~2.5 units ──
before = set(bpy.data.objects)
bpy.ops.import_scene.gltf(filepath=SAT_GLB)
imported = [o for o in bpy.data.objects if o not in before]
for o in imported:
    o.animation_data_clear()
imp_set = set(imported)
mn = Vector((1e18, 1e18, 1e18))
mx = Vector((-1e18, -1e18, -1e18))
for o in imported:
    if o.type != 'MESH':
        continue
    for c in o.bound_box:
        w = o.matrix_world @ Vector(c)
        mn = Vector((min(mn[i], w[i]) for i in range(3)))
        mx = Vector((max(mx[i], w[i]) for i in range(3)))
center = (mn + mx) / 2
maxd = max(mx - mn)
root = bpy.data.objects.new("SatRoot", None)
bpy.context.collection.objects.link(root)
for o in imported:
    if o.parent is None or o.parent not in imp_set:
        o.parent = root
        o.location = o.location - center
s = 2.8 / maxd
root.scale = (s, s, s)

# profile (side-on), slow tumble: rot y +0.4, x +0.15 over 240f
root.rotation_euler = (0.15, -0.20, math.radians(95))
root.keyframe_insert('rotation_euler', frame=1)
root.rotation_euler = (0.30, 0.20, math.radians(95))
root.keyframe_insert('rotation_euler', frame=240)

# drift into view: off-frame right (camera-right = world -X) -> settle by f100
bpy.context.preferences.edit.keyframe_new_interpolation_type = 'BEZIER'  # ease the arrival
SETTLE = Vector((-2.3, -16.0, 2.4))
root.location = SETTLE + Vector((-12.0, 1.0, 0.7))
root.keyframe_insert('location', frame=1)
root.location = SETTLE
root.keyframe_insert('location', frame=100)
root.location = SETTLE + Vector((0.8, -0.6, -0.15))
root.keyframe_insert('location', frame=240)
bpy.context.preferences.edit.keyframe_new_interpolation_type = 'LINEAR'

# ── lighting: warm golden key from camera-left low, paper rim from behind-right ──
key = bpy.data.lights.new("Key", 'SUN')
key.energy = 3.0
key.angle = 0.02
key.color = (1.0, 0.85, 0.63)
ko = bpy.data.objects.new("Key", key)
bpy.context.collection.objects.link(ko)
ko.location = (45, 25, 0)            # camera-left (+X), low, slightly behind camera
aim_at(ko, SETTLE)                   # lights the camera-facing hemisphere from the left

rimlight = bpy.data.lights.new("RimL", 'SUN')
rimlight.energy = 1.0
rimlight.angle = 0.03
rimlight.color = (0.949, 0.929, 0.890)  # paper
ro = bpy.data.objects.new("RimL", rimlight)
bpy.context.collection.objects.link(ro)
ro.location = (-25, -60, 10)         # behind-right
aim_at(ro, SETTLE)

# ── camera: 42mm, slight upward tilt; satellite right third, limb glowing below ──
cam_data = bpy.data.cameras.new("Cam")
cam_data.lens = 42
cam_data.sensor_width = 36
cam_data.clip_end = 2000
cam = bpy.data.objects.new("Cam", cam_data)
bpy.context.collection.objects.link(cam)
cam.location = (0, 0, 0)
cam.rotation_euler = (math.radians(94), 0, math.radians(180))  # -Y, 4 deg up tilt
scene.camera = cam

# ── EEVEE quality + bloom via compositor Glare (§3, 5.x compositing_node_group) ──
ee = scene.eevee
try:
    ee.use_raytracing = True
    ee.ray_tracing_options.resolution_scale = '1'
except AttributeError:
    pass
ee.taa_render_samples = 32 if PREVIEW else 64

try:
    if hasattr(scene, "compositing_node_group"):
        ct = bpy.data.node_groups.new("Comp", 'CompositorNodeTree')
        scene.compositing_node_group = ct
    else:
        scene.use_nodes = True
        ct = scene.node_tree
        ct.nodes.clear()
    rl = ct.nodes.new("CompositorNodeRLayers")
    glare = ct.nodes.new("CompositorNodeGlare")
    glare.glare_type = 'BLOOM'
    glare.quality = 'HIGH'
    glare.mix = 0.0
    glare.threshold = 1.2
    try:
        comp = ct.nodes.new("CompositorNodeComposite")
    except RuntimeError:
        comp = ct.nodes.new("NodeGroupOutput")
        ct.interface.new_socket("Image", in_out='OUTPUT', socket_type='NodeSocketColor')
    ct.links.new(rl.outputs['Image'], glare.inputs['Image'])
    ct.links.new(glare.outputs['Image'], comp.inputs[0])
except Exception as e:
    print("bloom skipped:", e)

r = scene.render
r.fps = 30
if PREVIEW:
    r.resolution_x, r.resolution_y = 960, 540
    r.image_settings.file_format = 'PNG'
    scene.frame_set(120)
    r.filepath = os.path.join(OUT, "orbit_preview.png")
    bpy.ops.render.render(write_still=True)
else:
    r.resolution_x, r.resolution_y = 1920, 1080
    r.image_settings.file_format = 'PNG'
    frames = os.path.join(OUT, "frames_orbit")
    os.makedirs(frames, exist_ok=True)
    r.filepath = os.path.join(frames, "orbit_")
    # resume support: FSTART/FEND env (keyframes stay absolute 1..240)
    scene.frame_start = int(os.environ.get("FSTART", "1"))
    scene.frame_end = int(os.environ.get("FEND", "240"))
    bpy.ops.render.render(animation=True)
