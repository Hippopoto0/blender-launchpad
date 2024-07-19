import sys
import shutil

print("Herererere")

path_to_delete = sys.argv[1]


print(path_to_delete)
shutil.rmtree(path_to_delete)