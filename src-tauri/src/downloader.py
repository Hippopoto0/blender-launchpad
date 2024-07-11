import requests
import sys

# url = "https://cdn.builder.blender.org/download/daily/archive/blender-4.3.0-alpha+main.e114467a5463-windows.amd64-release.zip"
url = "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip"
print("Getting fetch")
# response = requests.get(url, stream=True)
# file_size = int(response.headers.get("Content-Length", None))

save_path = sys.argv[1]

with requests.get(url, stream=True) as resp:
    file_size = int(resp.headers.get("Content-Length", None))
    chunk_size = 10000
    
    with open(save_path + "/current/file.zip", "wb") as f:
        for i, chunk in enumerate(resp.iter_content(10000)):
            f.write(chunk)
            print(f"[download_percentage]{round((i * chunk_size) / file_size * 100, 1)}%")
# print("Fetched")
# if response.status_code == 200:
#     with open("file.zip", "wb") as file:
#         file.write(response.content)
#         print("File downloaded successfully!")
# else:
#     print("Failed to download the file.")