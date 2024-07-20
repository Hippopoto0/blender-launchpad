import { fetchDownloadedInstances } from '@/features/thumbnails/ThumbnailManager';
import { listen } from '@tauri-apps/api/event';
import { create } from 'zustand'

interface BearState {
  bears: number
  increase: (by: number) => void
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}))

type Payload = {
    message: string;
};

export async function startMessageListener() {
    await listen<Payload>('message', (event) => {
        const message = event.payload.message
        console.log("got the message")
        if (message.startsWith("[download_percentage]")) {
            console.log("got here also")
            let [valAsStr, folderName] = message.split("[download_percentage]")[1].split(",")
            let val = parseFloat(valAsStr)
            // useDownloadingStore.setState({ progress: val, state: "downloading" })
            useDownloadingStore.getState().setDownloadState(folderName, {progress: val, state: "downloading"})
        }
        if (message.startsWith("[extracting_percentage]")) {
            let [valAsStr, folderName] = message.split("[extracting_percentage]")[1].split(",")
            let val = parseFloat(valAsStr)
            // useDownloadingStore.setState({ progress: val, state: "extracting"})
            useDownloadingStore.getState().setDownloadState(folderName, {progress: val, state: "extracting"})
        }
        if (message.startsWith("[download_finished]")) {
            // useDownloadingStore.setState({ progress: 0.0, state: "finished"})
            let [valAsStr, folderName] = message.split("[download_finished]")[1].split(",")
            let val = parseFloat(valAsStr)
            useDownloadingStore.getState().setDownloadState(folderName, {progress: 100, state: "finished"})
            fetchDownloadedInstances()
        }
        console.log("Event triggered from rust!\nPayload: " + event.payload.message);
    });
}


interface DownloadingStateOld {
    state: "downloading" | "extracting" | "finished"
    progress: number
    setProgress: (val: number) => void 
}

interface DownloadingState {
    currentlyDownloading: { [key: string]: InstanceDownloadState }
    setDownloadState: (key: string, state: InstanceDownloadState) => void
}

export type InstanceDownloadState = {
    state: "downloading" | "extracting" | "finished"
    progress: number
}

export const useDownloadingStore = create<DownloadingState>()((set) => ({
    currentlyDownloading: {},
    setDownloadState: (key, progressState) => set((state) => ({ currentlyDownloading: {...state.currentlyDownloading, [key]: progressState }}))

}))

