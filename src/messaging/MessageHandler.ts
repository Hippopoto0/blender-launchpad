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
            let val = parseFloat(message.split("[download_percentage]")[1])
            useDownloadingStore.setState({ progress: val })
        }
        console.log("Event triggered from rust!\nPayload: " + event.payload.message);
    });
}


interface DownloadingState {
    progress: number
    setProgress: (val: number) => void 
}

export const useDownloadingStore = create<DownloadingState>()((set) => ({
    progress: 0,
    setProgress: (val) => set((state) => ( { progress: val }))
}))

