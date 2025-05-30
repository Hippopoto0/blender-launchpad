import sys 
import os
import json

path_to_instances = ""

if len(sys.argv) > 1:
    path_to_instances = sys.argv[1]
else:
    path_to_instances = "C:/Users/danjo/AppData/Roaming/blender_launchpad/instances"

instances = []

for f in os.scandir(path_to_instances):
    if f.is_dir() == False: continue
    try:
        # in form blender-3.6.14-stable+v36.e480a2c4465b-windows.amd64-release
        # print(f.name)
        version = f.name.split("-")[1]
        variant = f.name.split("-")[2].split("+")[0]
        after_alpha = f.name.split("+")[1]
        if variant == "alpha":
            branch_name = after_alpha.split(".")[0]
            if "main" not in branch_name:
                variant = branch_name
    except:
        # in form blender-4.2.0-windows-x64 or blender-2.47-windows
        # if is all version it doesnt have the excess
        version = f.name.split("-")[1]
        variant = "release"

    folder_name = f.name

    instances.append({"version": version, "variant": variant, "path": path_to_instances + "/" + folder_name})

print(f"{json.dumps(instances)}")