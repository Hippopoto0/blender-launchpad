import { invoke } from "@tauri-apps/api";
import { appDataDir } from "@tauri-apps/api/path";

export async function downloadVersion(url: string) {
    await invoke("run_downloader", {path: await appDataDir(), url: url})
}