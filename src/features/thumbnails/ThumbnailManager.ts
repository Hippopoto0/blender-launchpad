import { invoke } from "@tauri-apps/api";
import { create } from "zustand";

export type BlenderInstance = {
    version: string,
    variant: string
}

interface BlenderInstances {
    instances: BlenderInstance[]
}

export const useInstancesStore = create<BlenderInstances>()((set) => ({
    instances: []
}))

export async function fetchDownloadedInstances() {
    let instancesAsString: string = await invoke("find_instances")

    let instancesAsJSON = JSON.parse(instancesAsString)

    let instancesToAdd: BlenderInstance[] = []
    instancesAsJSON.forEach((item: any) => {
        instancesToAdd = [...instancesToAdd, {version: item.version, variant: item.variant}]
    });

    useInstancesStore.setState({ instances: instancesToAdd})
}