import { invoke } from '@tauri-apps/api'
import { release } from 'os'
import { create } from 'zustand'

type BlenderRelease = {
    link: string,
    version: string,
    variant: string,
    dateReleased: string,
    arch: string
}
interface AlphaVersionsState {
    releases: BlenderRelease[]
}

const useAlphaVersionsStore = create<AlphaVersionsState>()((set) => ({
    releases: []
}))

export async function fetchDailyBuilds() {
    let dailyBuilds: string = await invoke("fetch_daily")
    let releasesAsJSON = JSON.parse(dailyBuilds)
    releasesAsJSON.forEach((release: any) => {
        useAlphaVersionsStore.setState({ releases: [...useAlphaVersionsStore.getState().releases, {
            link: release.url,
            version: release.version,
            variant: release.variant,
            dateReleased: release.dateReleased,
            arch: release.arch
        }] })
    });
}

export default function VersionsList() {
    const links = useAlphaVersionsStore((state) => state.releases)
    return <div>
        {links.map((item) =>
            <h1>{item.version}</h1>
        )}
    </div>
}