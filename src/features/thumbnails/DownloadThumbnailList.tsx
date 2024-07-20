import { useDownloadingStore } from "@/messaging/MessageHandler";
import DownloadingThumbnail from "./DownloadingThumbnail";


export default function DownloadingThumbnailList() {
    const currentlyDownloading = useDownloadingStore((state) => state.currentlyDownloading)

    return <>
        {/* <DownloadingThumbnail/> */}
        {Object.keys(currentlyDownloading).map((instanceFolderName, index) =>
            <DownloadingThumbnail state={currentlyDownloading[instanceFolderName].state} progress={currentlyDownloading[instanceFolderName].progress}  />
        )}
    </>
}