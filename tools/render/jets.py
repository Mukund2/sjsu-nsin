# Jets — shot 2 of the journey: two delta-wing jets (club-logo extrusion) streak
# through a golden sky above the cloud deck, toward the low sun.
# Per blender-cinematic-fx §1/§2/§3/§7 + HANDOFF Blender 5.1 traps.
# PREVIEW=1 -> single still (frame 80) at half res; else 240-frame PNG sequence.
import bpy, math, os, random
from mathutils import Vector, Matrix

PREVIEW = os.environ.get("PREVIEW") == "1"
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(HERE, "out")
os.makedirs(OUT, exist_ok=True)

LOGO_SVG = os.path.join(ROOT, "public", "logo.svg")

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
# 5.1 trap: Action.fcurves is gone — set interpolation pref BEFORE keyframing
bpy.context.preferences.edit.keyframe_new_interpolation_type = 'LINEAR'

try:
    scene.render.engine = 'BLENDER_EEVEE_NEXT'
except TypeError:
    scene.render.engine = 'BLENDER_EEVEE'

scene.view_settings.view_transform = 'AgX'
try:
    scene.view_settings.look = 'AgX - Punchy'
except TypeError:
    pass
scene.view_settings.exposure = -0.25
scene.frame_start, scene.frame_end = 1, 240


def aim_at(obj, target):
    d = (Vector(target) - obj.location).normalized()
    obj.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()


def set_hashed(mat):
    try:
        mat.surface_render_method = 'DITHERED'   # EEVEE Next / 5.x hashed equivalent
    except AttributeError:
        mat.blend_method = 'HASHED'


# ── world: golden-hour sky above the clouds (brighter than ocean) ──
world = bpy.data.worlds.new("GoldenSky")
scene.world = world
world.use_nodes = True
nt = world.node_tree
nt.nodes.clear()
sky = nt.nodes.new("ShaderNodeTexSky")
sky.sky_type = 'MULTIPLE_SCATTERING'   # 5.1 trap: NISHITA renamed
sky.sun_elevation = 0.06
sky.sun_rotation = math.radians(180)   # sun dead ahead of camera (-Y)
sky.sun_intensity = 0.75
sky.altitude = 800                      # above the deck
sky.air_density = 1.3
try:
    sky.aerosol_density = 1.6           # 5.x renamed dust->aerosol
except AttributeError:
    pass
bg = nt.nodes.new("ShaderNodeBackground")
bg.inputs['Strength'].default_value = 0.7
out = nt.nodes.new("ShaderNodeOutputWorld")
nt.links.new(sky.outputs['Color'], bg.inputs['Color'])
nt.links.new(bg.outputs['Background'], out.inputs['Surface'])

# sun key matching sky: low, hot gold, ahead of camera
sun = bpy.data.lights.new("Sun", 'SUN')
sun.energy = 6.0
sun.angle = 0.02
sun.color = (1.0, 0.5, 0.2)
so = bpy.data.objects.new("Sun", sun)
bpy.context.collection.objects.link(so)
so.rotation_euler = (math.radians(83), 0, 0)  # shining from -Y toward camera

# warm fill from behind camera-left so the gunmetal reads (not pure silhouette)
fill = bpy.data.lights.new("Fill", 'SUN')
fill.energy = 1.8
fill.angle = 0.1
fill.color = (1.0, 0.85, 0.63)
fo = bpy.data.objects.new("Fill", fill)
bpy.context.collection.objects.link(fo)
fo.location = (25, 35, 9)
aim_at(fo, (0, -30, 2))

# ── cloud deck: 9 large soft billboard planes below camera ──
cloudmat = bpy.data.materials.new("Cloud")
cloudmat.use_nodes = True
cnt = cloudmat.node_tree
cb = cnt.nodes["Principled BSDF"]
cb.inputs['Base Color'].default_value = (1.0, 0.93, 0.85, 1)
cb.inputs['Roughness'].default_value = 1.0
cb.inputs['Emission Color'].default_value = (1.0, 0.62, 0.35, 1)
cb.inputs['Emission Strength'].default_value = 0.18
texco = cnt.nodes.new("ShaderNodeTexCoord")
objinfo = cnt.nodes.new("ShaderNodeObjectInfo")
wmul = cnt.nodes.new("ShaderNodeMath")
wmul.operation = 'MULTIPLY'
wmul.inputs[1].default_value = 17.0
noise = cnt.nodes.new("ShaderNodeTexNoise")
noise.noise_dimensions = '4D'
noise.inputs['Scale'].default_value = 3.2
noise.inputs['Detail'].default_value = 4.0
ramp = cnt.nodes.new("ShaderNodeValToRGB")
ramp.color_ramp.elements[0].position = 0.42
ramp.color_ramp.elements[1].position = 0.72
# radial falloff so plane edges never show
vsub = cnt.nodes.new("ShaderNodeVectorMath")
vsub.operation = 'SUBTRACT'
vsub.inputs[1].default_value = (0.5, 0.5, 0.5)
vscale = cnt.nodes.new("ShaderNodeVectorMath")
vscale.operation = 'SCALE'
vscale.inputs['Scale'].default_value = 1.7
grad = cnt.nodes.new("ShaderNodeTexGradient")
grad.gradient_type = 'SPHERICAL'
amul = cnt.nodes.new("ShaderNodeMath")
amul.operation = 'MULTIPLY'
amul.use_clamp = True
afac = cnt.nodes.new("ShaderNodeMath")
afac.operation = 'MULTIPLY'
afac.inputs[1].default_value = 0.9
L = cnt.links
L.new(objinfo.outputs['Random'], wmul.inputs[0])
L.new(wmul.outputs['Value'], noise.inputs['W'])
L.new(texco.outputs['Generated'], noise.inputs['Vector'])
L.new(noise.outputs['Fac'], ramp.inputs['Fac'])
L.new(texco.outputs['Generated'], vsub.inputs[0])
L.new(vsub.outputs['Vector'], vscale.inputs[0])
L.new(vscale.outputs['Vector'], grad.inputs['Vector'])
L.new(ramp.outputs['Color'], amul.inputs[0])
L.new(grad.outputs['Color'], amul.inputs[1])
L.new(amul.outputs['Value'], afac.inputs[0])
L.new(afac.outputs['Value'], cb.inputs['Alpha'])
set_hashed(cloudmat)

random.seed(5)
for i in range(9):
    bpy.ops.mesh.primitive_plane_add(size=1)
    cp = bpy.context.active_object
    cp.name = f"Cloud{i}"
    sx = random.uniform(24, 55)
    cp.scale = (sx, sx * random.uniform(0.55, 1.0), 1)
    cp.location = (random.uniform(-55, 55), random.uniform(-130, -15), random.uniform(-9.0, -3.5))
    cp.rotation_euler = (0, 0, random.uniform(0, math.pi))
    cp.data.materials.append(cloudmat)

# ── the jets: club-logo delta extruded ──
def import_svg(path):
    try:
        bpy.ops.import_curve.svg(filepath=path)
        return
    except AttributeError:
        pass
    bpy.ops.preferences.addon_enable(module="io_curve_svg")
    bpy.ops.import_curve.svg(filepath=path)


before = set(bpy.data.objects)
import_svg(LOGO_SVG)
curves = [o for o in bpy.data.objects if o not in before and o.type == 'CURVE']
for o in bpy.data.objects:
    o.select_set(False)
for o in curves:
    o.select_set(True)
bpy.context.view_layer.objects.active = curves[0]
if len(curves) > 1:
    bpy.ops.object.join()
bpy.ops.object.convert(target='MESH')
jet = bpy.context.active_object
jet.name = "Jet1"
# move it into the scene collection if the importer made its own
for coll in list(jet.users_collection):
    coll.objects.unlink(jet)
bpy.context.collection.objects.link(jet)
# recenter origin to bbox center, scale to ~8 m wingspan, in object data
lb = [Vector(c) for c in jet.bound_box]
lcenter = sum(lb, Vector()) / 8
jet.data.transform(Matrix.Translation(-lcenter))
jet.data.update()
dims = jet.dimensions
sc = 8.0 / max(dims.x, 1e-6)
jet.data.transform(Matrix.Scale(sc, 4))
jet.data.update()
# nose points -Y (toward the sun)
jet.rotation_euler = (0, 0, math.pi)

sol = jet.modifiers.new("Sol", 'SOLIDIFY')
sol.thickness = 0.18
sol.offset = 0
bev = jet.modifiers.new("Bev", 'BEVEL')
bev.width = 0.035
bev.segments = 2

gun = bpy.data.materials.new("Gunmetal")
gun.use_nodes = True
gb = gun.node_tree.nodes["Principled BSDF"]
gb.inputs['Base Color'].default_value = (0.04, 0.04, 0.05, 1)
gb.inputs['Metallic'].default_value = 0.9
gb.inputs['Roughness'].default_value = 0.4
jet.data.materials.clear()
jet.data.materials.append(gun)

jet2 = jet.copy()
jet2.name = "Jet2"
bpy.context.collection.objects.link(jet2)

# formation flight: f1 close behind-left of camera -> f240 distant speck at horizon
J1 = [(1, (5.0, 6.0, 6.5)), (80, (1.2, -26.0, 2.2)), (240, (0.0, -185.0, -6.0))]
OFF = Vector((2.6, 5.0, -0.55))
J2 = [(f, tuple(Vector(p) + OFF)) for f, p in J1]
# nose-UP pitch (delta AoA): adds to the camera's look-down so the planform reads
BANK = [(1, (0.20, 0.10, math.pi)),
        (80, (0.25, 0.45, math.pi)),
        (160, (0.22, 0.15, math.pi)),
        (240, (0.20, 0.05, math.pi))]
for obj, path in ((jet, J1), (jet2, J2)):
    for f, p in path:
        obj.location = p
        obj.keyframe_insert('location', frame=f)
    for f, rot in BANK:
        obj.rotation_euler = rot
        obj.keyframe_insert('rotation_euler', frame=f)

# ── contrails: thin vertical ribbons along each flight path, head-gated alpha ──
trailmat = bpy.data.materials.new("Contrail")
trailmat.use_nodes = True
tnt = trailmat.node_tree
tb = tnt.nodes["Principled BSDF"]
tb.inputs['Base Color'].default_value = (0.95, 0.95, 0.97, 1)
tb.inputs['Roughness'].default_value = 1.0
tb.inputs['Emission Color'].default_value = (1.0, 0.85, 0.7, 1)
tb.inputs['Emission Strength'].default_value = 0.4
ttex = tnt.nodes.new("ShaderNodeTexCoord")
tsep = tnt.nodes.new("ShaderNodeSeparateXYZ")
# lengthwise fade (Generated Y: 0 = far end, 1 = start near camera)
tramp = tnt.nodes.new("ShaderNodeValToRGB")
tramp.color_ramp.elements[0].position = 0.02
tramp.color_ramp.elements[0].color = (0, 0, 0, 1)
tramp.color_ramp.elements[1].position = 0.12
tramp.color_ramp.elements[1].color = (1, 1, 1, 1)
ehi = tramp.color_ramp.elements.new(0.96)
ehi.color = (1, 1, 1, 1)
eend = tramp.color_ramp.elements.new(1.0)
eend.color = (0, 0, 0, 1)
# head gate: trail only exists where the jet has already been (gen_y > head)
head = tnt.nodes.new("ShaderNodeValue")
head.name = "Head"
hsub = tnt.nodes.new("ShaderNodeMath")
hsub.operation = 'SUBTRACT'
hgain = tnt.nodes.new("ShaderNodeMath")
hgain.operation = 'MULTIPLY'
hgain.inputs[1].default_value = 8.0
hgain.use_clamp = True
tmul = tnt.nodes.new("ShaderNodeMath")
tmul.operation = 'MULTIPLY'
tfac = tnt.nodes.new("ShaderNodeMath")
tfac.operation = 'MULTIPLY'
tfac.inputs[1].default_value = 0.35
TL = tnt.links
TL.new(ttex.outputs['Generated'], tsep.inputs['Vector'])
TL.new(tsep.outputs['Y'], tramp.inputs['Fac'])
TL.new(tsep.outputs['Y'], hsub.inputs[0])
TL.new(head.outputs['Value'], hsub.inputs[1])
TL.new(hsub.outputs['Value'], hgain.inputs[0])
TL.new(tramp.outputs['Color'], tmul.inputs[0])
TL.new(hgain.outputs['Value'], tmul.inputs[1])
TL.new(tmul.outputs['Value'], tfac.inputs[0])
TL.new(tfac.outputs['Value'], tb.inputs['Alpha'])
set_hashed(trailmat)
# head position over time = jet progress in Generated-Y terms (linear path segs)
hv = head.outputs[0]
hv.default_value = 1.0
hv.keyframe_insert('default_value', frame=1)
hv.default_value = 0.823
hv.keyframe_insert('default_value', frame=80)
hv.default_value = 0.0
hv.keyframe_insert('default_value', frame=240)


def make_trail(name, path, width=0.7):
    pts = [Vector(p) for _, p in path]
    verts, faces = [], []
    for p in pts:
        verts += [p + Vector((0, 0, width / 2)), p - Vector((0, 0, width / 2))]
    for i in range(len(pts) - 1):
        a = i * 2
        faces.append((a, a + 1, a + 3, a + 2))
    m = bpy.data.meshes.new(name)
    m.from_pydata(verts, [], faces)
    m.update()
    ob = bpy.data.objects.new(name, m)
    bpy.context.collection.objects.link(ob)
    m.materials.append(trailmat)
    return ob


make_trail("Trail1", J1)
make_trail("Trail2", J2)

# ── camera: 32mm, slightly down the flight path toward the low sun ──
cam_data = bpy.data.cameras.new("Cam")
cam_data.lens = 32
cam_data.sensor_width = 36
cam_data.clip_end = 5000
cam = bpy.data.objects.new("Cam", cam_data)
bpy.context.collection.objects.link(cam)
cam.location = (0, 14, 8.0)
cam.rotation_euler = (math.radians(80), 0, math.radians(180))  # -Y, 10 deg down
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
    scene.frame_set(80)
    r.filepath = os.path.join(OUT, "jets_preview.png")
    bpy.ops.render.render(write_still=True)
else:
    r.resolution_x, r.resolution_y = 1920, 1080
    r.image_settings.file_format = 'PNG'
    frames = os.path.join(OUT, "frames_jets")
    os.makedirs(frames, exist_ok=True)
    r.filepath = os.path.join(frames, "jets_")
    # resume support: FSTART/FEND env (keyframes stay absolute 1..240)
    scene.frame_start = int(os.environ.get("FSTART", "1"))
    scene.frame_end = int(os.environ.get("FEND", "240"))
    bpy.ops.render.render(animation=True)
