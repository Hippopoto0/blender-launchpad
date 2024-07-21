from bs4 import BeautifulSoup
import requests
import re
import sys
import json


if len(sys.argv) == 1:
    soup = BeautifulSoup(requests.get("https://download.blender.org/release/").content, "html.parser")
    all_links = soup.select("a")
    print(json.dumps([x.text for x in all_links if re.match(r"Blender\d+\.\d+\/", x.text)]))
else:
    soup = BeautifulSoup(requests.get("https://download.blender.org/release/" + sys.argv[1]).content, "html.parser")
    all_links = soup.select("a")
    a_as_windows_zip = [("https://download.blender.org/release/" + sys.argv[1] + x.text) for x in all_links if re.match(r".+-windows.+\.zip", x.text)]
    print(a_as_windows_zip)