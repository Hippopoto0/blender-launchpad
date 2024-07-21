import { useDownloadingStore } from '@/features/downloading/DownloadManager';
import { fetchDownloadedInstances } from '@/features/instances/InstanceManager';
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
        // DOWNLOADING MESSAGES
        // input: [download_percentage]100.0,blender_version_download_name
        if (message.startsWith("[download_percentage]")) {
            let [valAsStr, folderName] = message.split("[download_percentage]")[1].split(",")
            let val = parseFloat(valAsStr)
            useDownloadingStore.getState().setDownloadState(folderName, {progress: val, state: "downloading"})
        }
        // input: [extracting_percentage]100.0,blender_version_download_name
        if (message.startsWith("[extracting_percentage]")) {
            let [valAsStr, folderName] = message.split("[extracting_percentage]")[1].split(",")
            let val = parseFloat(valAsStr)
            useDownloadingStore.getState().setDownloadState(folderName, {progress: val, state: "extracting"})
        }
        // input: [download_finished],blender_version_download_name
        if (message.startsWith("[download_finished]")) {
            let [valAsStr, folderName] = message.split("[download_finished]")[1].split(",")
            let val = parseFloat(valAsStr)
            useDownloadingStore.getState().setDownloadState(folderName, {progress: 100, state: "finished"})
            fetchDownloadedInstances()
        }
    });
}



