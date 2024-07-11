import { useDownloadingStore } from "@/messaging/MessageHandler"


export default function DownloadingThumbnail() {
    const progress = useDownloadingStore((state) => state.progress)

    return <div className="w-48 h-32 rounded-md overflow-hidden relative shadow-md">
        <img className="absolute top-0 left-0" src="https://picsum.photos/300/200" alt="oops" />
        <div className="absolute top-0 left-0 w-full h-full bg-white/70 flex items-center justify-center">
        </div>
        <div className="absolute top-0 left-0 h-full bg-black/20 shadow-lg transition-all" style={{width: `${progress}%`}}></div>
        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
            <h1 className="font-bold text-2xl">{progress}</h1>
        </div>
    </div>
}