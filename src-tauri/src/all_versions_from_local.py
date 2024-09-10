import json
import os
from pathlib import Path

# absolute path so no disparity between dev and build
path = Path(__file__).parent / "./SavedPrevVersions.json"

with open(path, "r") as prevVersionFp:
    prevVersions = json.load(prevVersionFp)

    print(json.dumps(prevVersions))