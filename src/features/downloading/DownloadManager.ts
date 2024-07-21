import { invoke } from "@tauri-apps/api";
import { appDataDir } from "@tauri-apps/api/path";
import { create } from "zustand";

export async function downloadVersion(url: string) {
    await invoke("run_downloader", {path: await appDataDir(), url: url})

}
export interface DownloadingState {
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