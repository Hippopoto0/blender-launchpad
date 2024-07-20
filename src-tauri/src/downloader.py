import requests
import sys
import zipfile
import os

url = "https://cdn.builder.blender.org/download/daily/archive/blender-4.3.0-alpha+main.e114467a5463-windows.amd64-release.zip"
# url = "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip"
print("Getting fetch")
# response = requests.get(url, stream=True)
# file_size = int(response.headers.get("Content-Length", None))

save_path, url_to_download, extract_path, downloaded_name = "", "", "", ""
if len(sys.argv) > 1:
    url_to_download = sys.argv[2]
    downloaded_name = ""
    if "daily/" in url_to_download:
        downloaded_name = url_to_download.split("daily/")[1].split(".zip")[0]
    elif "experimental/" in url_to_download:
        downloaded_name = url_to_download.split("experimental/")[1].split(".zip")[0]
    save_path = (sys.argv[1] + f"current\\{downloaded_name}.zip").replace("\\", "/")

    extract_path = sys.argv[1] + "/instances/"
else:
    save_path = "file.zip"
    url_to_download = url
    extract_path = "./instances/"

print("savepath: " + save_path)
print("URL: " + url_to_download)
print("downloaded_name: " + downloaded_name)
if os.path.exists(save_path):
    print("removing file")
    os.remove(save_path)

with requests.get(url_to_download, stream=True) as resp:
    file_size = int(resp.headers.get("Content-Length", None))
    chunk_size = 10000
    
    with open(save_path, "wb") as f:
        for i, chunk in enumerate(resp.iter_content(10000)):
            f.write(chunk)
            sys.stdout.flush()
            print(f"[download_percentage]{round((i * chunk_size) / file_size * 100, 1)}%,{downloaded_name}")

# os.mkdir(extract_path)

with zipfile.ZipFile(save_path, "r") as zipRef:
    for index, member in enumerate(zipRef.infolist()):
        try:
            zipRef.extract(member, extract_path)
            # print(index / zipRef.infolist().__len__())
            print(f"[extracting_percentage]{round(index / len(zipRef.infolist()) * 100, 2)},{downloaded_name}")
        except zipfile.error:
            pass

print(f"[download_finished]100%,{downloaded_name}")
# print("Fetched")
# if response.status_code == 200:
#     with open("file.zip", "wb") as file:
#         file.write(response.content)
#         print("File downloaded successfully!")
# else:
#     print("Failed to download the file.")