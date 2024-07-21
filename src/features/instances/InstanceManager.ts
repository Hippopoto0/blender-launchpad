import { create } from "zustand";
import { invoke } from "@tauri-apps/api";

export type BlenderInstance = {
    version: string;
    variant: string;
    path: string;
};

export interface BlenderInstances {
    instances: BlenderInstance[];
}


export const useInstancesStore = create<BlenderInstances>()((set) => ({
    instances: []
}))

export async function fetchDownloadedInstances() {
    let instancesAsString: string = await invoke("find_instances")

    let instancesAsJSON = JSON.parse(instancesAsString)

    let instancesToAdd: BlenderInstance[] = []
    instancesAsJSON.forEach((item: any) => {
        instancesToAdd = [...instancesToAdd, {version: item.version, variant: item.variant, path: item.path}]
    });

    useInstancesStore.setState({ instances: instancesToAdd})
}

export async function deleteInstance(instancePath: string) {
    await invoke("delete_instance", { path: instancePath })

    fetchDownloadedInstances()
}

export async function launchInstance(instancePath: string) {
    await invoke("launch_instance", { path: instancePath })
}