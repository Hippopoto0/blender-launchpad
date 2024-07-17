import { invoke } from '@tauri-apps/api'
import { release } from 'os'
import { FaDownload } from 'react-icons/fa'
import { create } from 'zustand'
import { downloadVersion } from '../downloading/DownloadManager'

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
    useAlphaVersionsStore.setState({releases: [] })
    console.log("Being called")
    releasesAsJSON.forEach((release: any) => {
        useAlphaVersionsStore.setState({ releases: [...useAlphaVersionsStore.getState().releases, {
            link: release.url,
            version: release.version,
            variant: release.variant,
            dateReleased: release.dateReleased,
            arch: release.arch
        }] })
    });

    console.log(useAlphaVersionsStore.getState())
}

export default function VersionsList() {
    const releases = useAlphaVersionsStore((state) => state.releases)
    return <div className=' h-40 m-2 flex flex-col gap-2 overflow-y-scroll'>
        {releases.map((release) =>
            <div className='w-full grid grid-cols-[5rem_8rem_5rem__auto] bg-slate-700 py-2 px-2'>
                <h1 className='font-bold text-gray-50 text-left'>{release.version.replace("Blender ", "")}</h1>
                <div className={`font-bold text-left ${release.variant == "Alpha" ? "text-red-400" : "text-blue-400"}`}>{release.variant}</div>
                <p className='text-sm text-white opacity-50 flex items-center justify-center'>{release.dateReleased}</p>
                <button 
                    onClick={() => downloadVersion(release.link)}
                    className='w-8 flex items-center justify-center ml-auto mr-2 bg-blue-500'>
                    <FaDownload className='text-white' />
                </button>
            </div>
        )}
    </div>
}