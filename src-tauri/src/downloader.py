import requests
import sys
import zipfile

url = "https://cdn.builder.blender.org/download/daily/archive/blender-4.3.0-alpha+main.e114467a5463-windows.amd64-release.zip"
# url = "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip"
print("Getting fetch")
# response = requests.get(url, stream=True)
# file_size = int(response.headers.get("Content-Length", None))

save_path, url_to_download, extract_path = "", "", ""
if len(sys.argv) > 1:
    save_path = sys.argv[1] + "/current/file.zip"
    url_to_download = sys.argv[2]
    extract_path = sys.argv[1] + "/instances/"
else:
    save_path = "file.zip"
    url_to_download = url
    extract_path = "/instances/"

with requests.get(url_to_download, stream=True) as resp:
    file_size = int(resp.headers.get("Content-Length", None))
    chunk_size = 10000
    
    with open(save_path, "wb") as f:
        for i, chunk in enumerate(resp.iter_content(10000)):
            f.write(chunk)
            sys.stdout.flush()
            print(f"[download_percentage]{round((i * chunk_size) / file_size * 100, 1)}%")

with zipfile.ZipFile(extract_path + "testthing", "r") as zipRef:
    for index, member in enumerate(zipRef.infolist()):
        try:
            zipRef.extract(member, "target")
            # print(index / zipRef.infolist().__len__())
            print(f"[extracting_percentage]{round(index / len(zipRef.infolist()) * 100, 2)}")
        except zipfile.error:
            pass

print("[download_finished]")
# print("Fetched")
# if response.status_code == 200:
#     with open("file.zip", "wb") as file:
#         file.write(response.content)
#         print("File downloaded successfully!")
# else:
#     print("Failed to download the file.")