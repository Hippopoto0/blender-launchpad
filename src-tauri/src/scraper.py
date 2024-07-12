from bs4 import BeautifulSoup
import requests
from dataclasses import dataclass
from typing import List
import json

soup = BeautifulSoup(requests.get("https://builder.blender.org/download/daily/").content, "html.parser")

all_release_rows = soup.select("li.t-row.build")

@dataclass
class DownloadableVersion:
    url: str
    version: str
    dateReleased: str
    variant: str
    arch: str

releases: List[any] = []

for release_row in all_release_rows:
    items = release_row.select("a")

    # downloadableVersion.version = items[0]
    # downloadableVersion.variant = items[1]

    link = release_row.select("div.t-cell.b-down>a")[0].attrs["href"]
    date = release_row.select("div.t-cell.b-date")[0].text
    arch = release_row.select("div.t-cell.b-arch")[0].text

    # downloadableVersion.dateReleased = date
    # downloadableVersion.url = link
    
    downloadableVersion = DownloadableVersion(link, items[0].text, date, items[1].text, arch)
    if arch == "windows x64":
        releases.append({"url": downloadableVersion.url,
                         "version": downloadableVersion.version,
                         "variant": downloadableVersion.variant,
                         "dateReleased": downloadableVersion.dateReleased,
                         "arch": downloadableVersion.arch
                         })


print(json.dumps(releases))
