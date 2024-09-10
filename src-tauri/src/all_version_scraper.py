from bs4 import BeautifulSoup
import requests
import re
import sys
import json

if len(sys.argv) == 1:
    soup = BeautifulSoup(requests.get("https://download.blender.org/release/").content, "html.parser")
    all_links = soup.select("a")
    print(json.dumps(["Blender " + x.text.split("Blender")[1].replace("/", "") for x in all_links if re.match(r"Blender\d+\.\d+\/", x.text)]))
else:
    # comes in form Blender 2.0, needs to be Blender2.0/
    blender_url_extension = sys.argv[1].replace(" ", "") + "/"

    soup = BeautifulSoup(requests.get("https://download.blender.org/release/" + blender_url_extension).content, "html.parser")
    all_links = soup.select("a")
    a_as_windows_zip = [("https://download.blender.org/release/" + blender_url_extension + x.text) for x in all_links if re.match(r".+-windows.+\.zip", x.text)]
    
    print(json.dumps([{"version": "Blender " + x.split("-")[1], "link": x} for x in a_as_windows_zip]))