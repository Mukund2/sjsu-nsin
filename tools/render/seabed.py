# Seabed cable — the descent's floor. blender-cinematic-fx §5 (volume) + cable w/ gold pulse.
# PREVIEW=1 -> single still at half res; else 240-frame PNG sequence.
import bpy, math, os, random

PREVIEW = os.environ.get("PREVIEW") == "1"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out")
os.makedirs(OUT, exist_ok=True)

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
bpy.context.preferences.edit.keyframe_new_interpolation_type = 'LINEAR'
try:
    scene.render.engine = 'BLENDER_EEVEE_NEXT'
except TypeError:
    scene.render.engine = 'BLENDER_EEVEE'
scene.view_settings.view_transform = 'AgX'
scene.view_settings.exposure = 0.2
scene.frame_start, scene.frame_end = 1, 240

# world: near-black deep teal
world = bpy.data.worlds.new("Deep")
scene.world = world
world.use_nodes = True
wnt = world.node_tree
wnt.nodes.clear()
bg = wnt.nodes.new("ShaderNodeBackground")
bg.inputs['Color'].default_value = (0.010, 0.026, 0.030, 1)
bg.inputs['Strength'].default_value = 1.0
wout = wnt.nodes.new("ShaderNodeOutputWorld")
wnt.links.new(bg.outputs['Background'], wout.inputs['Surface'])

# seabed: displaced plane, dark sediment
bpy.ops.mesh.primitive_plane_add(size=120)
bed = bpy.context.active_object
bed.name = "Seabed"
sub = bed.modifiers.new("Sub", 'SUBSURF')
sub.subdivision_type = 'SIMPLE'
sub.levels = 6
sub.render_levels = 7
tex = bpy.data.textures.new("ripple", 'CLOUDS')
tex.noise_scale = 2.2
disp = bed.modifiers.new("Disp", 'DISPLACE')
disp.texture = tex
disp.strength = 1.1
bmat = bpy.data.materials.new("Sediment")
bmat.use_nodes = True
bb = bmat.node_tree.nodes["Principled BSDF"]
bb.inputs['Base Color'].default_value = (0.038, 0.048, 0.044, 1)
bb.inputs['Roughness'].default_value = 0.95
bed.data.materials.append(bmat)

# the cable: curve snaking to the horizon, gunmetal tube + gold pulse band
curve = bpy.data.curves.new("CablePath", 'CURVE')
curve.dimensions = '3D'
curve.bevel_depth = 0.16
curve.bevel_resolution = 6
sp = curve.splines.new('NURBS')
pts = [(-3.5, -6, 0.55), (-1.2, 4, 0.5), (2.2, 16, 0.6), (-0.5, 30, 0.5), (3.5, 48, 0.6), (1.0, 70, 0.5)]
sp.points.add(len(pts) - 1)
for i, (x, y, z) in enumerate(pts):
    sp.points[i].co = (x, y, z, 1)
sp.use_endpoint_u = True
cable = bpy.data.objects.new("Cable", curve)
bpy.context.collection.objects.link(cable)

cmat = bpy.data.materials.new("CableMat")
cmat.use_nodes = True
cnt = cmat.node_tree
cb = cnt.nodes["Principled BSDF"]
cb.inputs['Base Color'].default_value = (0.045, 0.045, 0.05, 1)
cb.inputs['Metallic'].default_value = 0.85
cb.inputs['Roughness'].default_value = 0.45
# gold pulse: emission band moving along the tube's length (spline U via Generated Y)
texco = cnt.nodes.new("ShaderNodeTexCoord")
sep = cnt.nodes.new("ShaderNodeSeparateXYZ")
val = cnt.nodes.new("ShaderNodeValue")  # animated pulse position 0..1
val.name = "PulsePos"
sub_n = cnt.nodes.new("ShaderNodeMath")
sub_n.operation = 'SUBTRACT'
absn = cnt.nodes.new("ShaderNodeMath")
absn.operation = 'ABSOLUTE'
lt = cnt.nodes.new("ShaderNodeMath")
lt.operation = 'LESS_THAN'
lt.inputs[1].default_value = 0.04  # band width
emis = cnt.nodes.new("ShaderNodeEmission")
emis.inputs['Color'].default_value = (1.0, 0.72, 0.30, 1)
emis.inputs['Strength'].default_value = 14.0
mix = cnt.nodes.new("ShaderNodeMixShader")
outn = next(n for n in cnt.nodes if n.type == 'OUTPUT_MATERIAL')
L = cnt.links
L.new(texco.outputs['Generated'], sep.inputs['Vector'])
L.new(sep.outputs['Y'], sub_n.inputs[0])
L.new(val.outputs['Value'], sub_n.inputs[1])
L.new(sub_n.outputs['Value'], absn.inputs[0])
L.new(absn.outputs['Value'], lt.inputs[0])
L.new(lt.outputs['Value'], mix.inputs['Fac'])
L.new(cb.outputs['BSDF'], mix.inputs[1])
L.new(emis.outputs['Emission'], mix.inputs[2])
L.new(mix.outputs['Shader'], outn.inputs['Surface'])
val.outputs[0].default_value = 0.0
val.outputs[0].keyframe_insert('default_value', frame=1)
val.outputs[0].default_value = 1.0
val.outputs[0].keyframe_insert('default_value', frame=240)
cable.data.materials.append(cmat)

# faint light from the surface far above + cool fill
key = bpy.data.lights.new("Down", 'SUN')
key.energy = 3.0
key.angle = 0.4
key.color = (0.45, 0.75, 0.78)
ko = bpy.data.objects.new("Down", key)
bpy.context.collection.objects.link(ko)
ko.rotation_euler = (math.radians(12), 0, 0)
spot = bpy.data.lights.new("Shaft", 'SPOT')
spot.energy = 60000
spot.spot_size = math.radians(28)
spot.spot_blend = 0.9
spot.color = (0.5, 0.85, 0.85)
so = bpy.data.objects.new("Shaft", spot)
bpy.context.collection.objects.link(so)
so.location = (4, 18, 26)
so.rotation_euler = (math.radians(-8), 0, 0)

# water volume for depth haze + shafts
bpy.ops.mesh.primitive_cube_add(size=1)
vol = bpy.context.active_object
vol.name = "WaterVolume"
vol.scale = (70, 90, 20)
vol.location = (0, 30, 9)
vmat = bpy.data.materials.new("SeaVolume")
vmat.use_nodes = True
vnt = vmat.node_tree
vnt.nodes.clear()
pv = vnt.nodes.new("ShaderNodeVolumePrincipled")
pv.inputs['Color'].default_value = (0.05, 0.22, 0.26, 1)
pv.inputs['Density'].default_value = 0.026
pv.inputs['Anisotropy'].default_value = 0.55
vout = vnt.nodes.new("ShaderNodeOutputMaterial")
vnt.links.new(pv.outputs['Volume'], vout.inputs['Volume'])
vol.data.materials.append(vmat)

# marine snow
random.seed(7)
snow = bpy.data.materials.new("Snow")
snow.use_nodes = True
sb = snow.node_tree.nodes["Principled BSDF"]
sb.inputs['Emission Color'].default_value = (0.85, 0.92, 0.9, 1)
sb.inputs['Emission Strength'].default_value = 0.6
for i in range(70):
    bpy.ops.mesh.primitive_ico_sphere_add(radius=0.02, subdivisions=1)
    p = bpy.context.active_object
    p.location = (random.uniform(-12, 12), random.uniform(-4, 40), random.uniform(0.5, 12))
    p.data.materials.append(snow)

# EEVEE volumetrics
ee = scene.eevee
try:
    ee.use_volumetric_shadows = True
    ee.volumetric_tile_size = '2'
except AttributeError:
    pass
ee.taa_render_samples = 32 if PREVIEW else 64

# camera: low over the bed, cable leading to the horizon
cam_data = bpy.data.cameras.new("Cam")
cam_data.lens = 30
cam = bpy.data.objects.new("Cam", cam_data)
bpy.context.collection.objects.link(cam)
cam.location = (-2.2, -10, 2.4)
cam.rotation_euler = (math.radians(82), 0, math.radians(-6))
scene.camera = cam
cam.keyframe_insert('location', frame=1)
cam.location = (-1.4, -4, 2.1)
cam.keyframe_insert('location', frame=240)

r = scene.render
r.fps = 30
if PREVIEW:
    r.resolution_x, r.resolution_y = 960, 540
    r.image_settings.file_format = 'PNG'
    scene.frame_set(120)
    r.filepath = os.path.join(OUT, "seabed_preview.png")
    bpy.ops.render.render(write_still=True)
else:
    r.resolution_x, r.resolution_y = 1920, 1080
    r.image_settings.file_format = 'PNG'
    frames = os.path.join(OUT, "frames_seabed")
    os.makedirs(frames, exist_ok=True)
    r.filepath = os.path.join(frames, "seabed_")
    bpy.ops.render.render(animation=True)
