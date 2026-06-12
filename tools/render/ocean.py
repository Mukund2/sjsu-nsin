# Golden Pacific — shot 3 of the journey. Per blender-cinematic-fx §4/§2/§3/§7.
# PREVIEW=1 -> single mid-frame still at half res; else full 8s animation.
import bpy, math, os

PREVIEW = os.environ.get("PREVIEW") == "1"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out")
os.makedirs(OUT, exist_ok=True)

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
bpy.context.preferences.edit.keyframe_new_interpolation_type = 'LINEAR'

# engine — Blender 5.x id (cinematic-fx §7)
try:
    scene.render.engine = 'BLENDER_EEVEE_NEXT'
except TypeError:
    scene.render.engine = 'BLENDER_EEVEE'

# color: AgX Punchy keeps gold glints unclipped (§2)
scene.view_settings.view_transform = 'AgX'
try:
    scene.view_settings.look = 'AgX - Punchy'
except TypeError:
    pass
scene.view_settings.exposure = -0.25

# ── world: golden-hour HDRI ──
world = bpy.data.worlds.new("Sunset")
scene.world = world
world.use_nodes = True
nt = world.node_tree
nt.nodes.clear()
sky = nt.nodes.new("ShaderNodeTexSky")
sky.sky_type = 'MULTIPLE_SCATTERING'
sky.sun_elevation = 0.035          # ~3 deg — deep golden hour
sky.sun_rotation = math.radians(180)  # sun dead ahead of camera (-Y)
sky.sun_intensity = 0.75
sky.altitude = 4
sky.air_density = 1.4
try:
    sky.aerosol_density = 1.6      # 5.x renamed dust->aerosol; haze = warmer horizon
except AttributeError:
    pass
bg = nt.nodes.new("ShaderNodeBackground")
bg.inputs['Strength'].default_value = 0.55
out = nt.nodes.new("ShaderNodeOutputWorld")
nt.links.new(sky.outputs['Color'], bg.inputs['Color'])
nt.links.new(bg.outputs['Background'], out.inputs['Surface'])

# sun key matching HDRI: low, warm, in front of camera (gold path, §4)
sun = bpy.data.lights.new("Sun", 'SUN')
sun.energy = 7.0
sun.angle = 0.018
sun.color = (1.0, 0.45, 0.15)
so = bpy.data.objects.new("Sun", sun)
bpy.context.collection.objects.link(so)
so.rotation_euler = (math.radians(82), 0, 0)  # ~8 deg above horizon, shining from -Y toward camera

# ── ocean (§4) ──
bpy.ops.mesh.primitive_plane_add(size=1)
ocean = bpy.context.active_object
ocean.name = "Ocean"
mod = ocean.modifiers.new("Ocean", 'OCEAN')
mod.geometry_mode = 'GENERATE'
mod.repeat_x = 3
mod.repeat_y = 3
mod.resolution = 24 if PREVIEW else 36
mod.viewport_resolution = 16
mod.spatial_size = 50
mod.wave_scale = 1.3
mod.choppiness = 1.55
mod.wave_alignment = 0.35
mod.wave_direction = math.radians(90)  # swell rolling toward camera
mod.use_foam = True
mod.foam_coverage = 0.10
mod.foam_layer_name = "foam"
ocean.location = (0, 0, 0)

scene.frame_start, scene.frame_end = 1, 240
mod.time = 1.0
mod.keyframe_insert('time', frame=scene.frame_start)
mod.time = 9.0
mod.keyframe_insert('time', frame=scene.frame_end)


mat = bpy.data.materials.new("SunsetWater")
mat.use_nodes = True
mnt = mat.node_tree
bsdf = mnt.nodes["Principled BSDF"]
bsdf.inputs['Base Color'].default_value = (0.004, 0.010, 0.016, 1)
bsdf.inputs['Roughness'].default_value = 0.08
bsdf.inputs['IOR'].default_value = 1.33
bsdf.inputs['Metallic'].default_value = 0.0
ocean.data.materials.append(mat)

# far-field: flat sea to the horizon under the simulated patch
bpy.ops.mesh.primitive_plane_add(size=1)
far = bpy.context.active_object
far.name = "FarSea"
far.scale = (12000, 12000, 1)
far.location = (0, 0, -0.06)
far.data.materials.append(mat)

# ── camera: low over the water, facing the sun (§1) ──
cam_data = bpy.data.cameras.new("Cam")
cam_data.lens = 32
cam_data.sensor_width = 36
cam = bpy.data.objects.new("Cam", cam_data)
bpy.context.collection.objects.link(cam)
cam.location = (0, 18, 2.2)
cam.rotation_euler = (math.radians(86), 0, math.radians(180))  # look toward -Y horizon
scene.camera = cam
# slow push-in for the clip
cam.keyframe_insert('location', frame=1)
cam.location = (0, 12, 1.8)
cam.keyframe_insert('location', frame=240)


# ── EEVEE quality + bloom via compositor Glare (§3) ──
ee = scene.eevee
try:
    ee.use_raytracing = True
    ee.ray_tracing_options.resolution_scale = '1'
except AttributeError:
    pass
ee.taa_render_samples = 32 if PREVIEW else 64

# bloom via compositor Glare — Blender 5.x moved the tree to compositing_node_group
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
    r.filepath = os.path.join(OUT, "ocean_preview.png")
    bpy.ops.render.render(write_still=True)
else:
    r.resolution_x, r.resolution_y = 1920, 1080
    r.image_settings.file_format = 'PNG'
    frames = os.path.join(OUT, "frames")
    os.makedirs(frames, exist_ok=True)
    r.filepath = os.path.join(frames, "ocean_")
    bpy.ops.render.render(animation=True)
