import { invoke } from '@tauri-apps/api'
import { release } from 'os'
import { FaDownload } from 'react-icons/fa'
import { create } from 'zustand'
import { downloadVersion } from '../downloading/DownloadManager'
import PrevVersions from "./SavedPrevVersions.json"

type BlenderRelease = {
    link: string,
    version: string,
    variant: string,
    dateReleased: string,
    arch: string
}
interface BlenderVersionsState {
    releases: BlenderRelease[]
}

const useDailyVersionsStore = create<BlenderVersionsState>()((set) => ({
    releases: []
}))

const useBranchVersionsStore = create<BlenderVersionsState>()((set) => ({
    releases: []
}))

const useAllVersionsStore = create<BlenderVersionsState>()((set) => ({
    releases: []
}))

export async function fetchDailyBuilds() {
    let dailyBuilds: string = await invoke("fetch_daily")
    let releasesAsJSON = JSON.parse(dailyBuilds)
    useDailyVersionsStore.setState({releases: [] })
    console.log("Being called")
    releasesAsJSON.forEach((release: any) => {
        useDailyVersionsStore.setState({ releases: [...useDailyVersionsStore.getState().releases, {
            link: release.url,
            version: release.version,
            variant: release.variant,
            dateReleased: release.dateReleased,
            arch: release.arch
        }] })
    });

    // console.log(useDailyVersionsStore.getState())
}

export async function fetchBranchBuilds() {
    let branchBuilds: string = await invoke("fetch_branch")
    let releasesAsJSON = JSON.parse(branchBuilds)
    useBranchVersionsStore.setState({releases: [] })
    console.log("Being called")
    releasesAsJSON.forEach((release: any) => {
        useBranchVersionsStore.setState({ releases: [...useBranchVersionsStore.getState().releases, {
            link: release.url,
            version: release.version,
            variant: release.variant,
            dateReleased: release.dateReleased,
            arch: release.arch
        }] })
    });

    // console.log(useBranchVersionsStore.getState())
}

export async function fetchAllBuilds() {
    // returns [Blender 2.0, Blender 4.0 etc]
    // let branchBuildsMajorVersionsStr: string = await invoke("fetch_all_builds_version")
    // let branchBuildsMajorVersions: string[] = JSON.parse(branchBuildsMajorVersionsStr)
    // let releases: BlenderRelease[] = []
    // for (let i = 0; i < branchBuildsMajorVersions.length; i++) {
    //     const item = branchBuildsMajorVersions[i];
    //     let pageReleasesStr: string = await invoke("fetch_all_builds_on_page", {version: item}) 
    //     let pageReleases: any[] = JSON.parse(pageReleasesStr)
    //     console.log(pageReleasesStr)
    //     pageReleases.forEach((item) => {
    //         releases = [...releases, {
    //             link: item.link,
    //             version: item.version,
    //             arch: "x64",
    //             dateReleased: "02 Jun 23",
    //             variant: "release"
    //         }]
    //     })
    // }

    let releases = PrevVersions;
    releases.reverse()



    useAllVersionsStore.setState({ releases: releases })



    console.log(releases)

}

export function VersionsList() {
    const releases = useDailyVersionsStore((state) => state.releases)

    return <div className=' h-40 m-2 flex flex-col gap-2 overflow-y-scroll'>
        {releases.map((release) =>
            <div className='w-full grid grid-cols-[5rem_8rem_auto_4rem] bg-slate-700 py-2 px-2'>
                <h1 className='font-bold text-gray-50 text-left'>{release.version.replace("Blender ", "")}</h1>
                <div className={`font-bold text-left ${release.variant == "Alpha" ? "text-red-400" : "text-blue-400"}`}>{release.variant}</div>
                <p className='text-sm text-white opacity-50 flex justify-end items-center'>{release.dateReleased}</p>
                <button 
                    onClick={() => downloadVersion(release.link)}
                    className='w-8 flex items-center justify-center ml-auto mr-2 bg-blue-500'>
                    <FaDownload className='text-white' />
                </button>
            </div>
        )}
    </div>
}

export function VersionsListBranch() {
    const releases = useBranchVersionsStore((state) => state.releases)

    return <div className=' h-40 m-2 flex flex-col gap-2 overflow-y-scroll'>
        {releases.map((release) =>
            <div className='w-full grid grid-cols-[5rem_auto_6rem_3rem] bg-slate-700 py-2 px-2'>
                <h1 className='font-bold text-gray-50 text-left'>{release.version.replace("Blender ", "")}</h1>
                <div className={`font-bold text-left text-sm text-red-400`}>{release.variant}</div>
                <p className='text-sm text-white opacity-50 flex items-center justify-center'>{release.dateReleased}</p>
                <div className='flex items-center justify-center'>
                    <button 
                        onClick={() => downloadVersion(release.link)}
                        className='w-8 h-6 flex items-center justify-center ml-auto mr-2 bg-blue-500'>
                        <FaDownload className='text-white' />
                    </button>
                </div>
            </div>
        )}
    </div>
}

export function AllVersionsList() {
    const releases = useAllVersionsStore((state) => state.releases)

    return <div className=' h-40 m-2 flex flex-col gap-2 overflow-y-scroll'>
        {releases.map((release) =>
            <div className='w-full grid grid-cols-[5rem_8rem_auto_4rem] bg-slate-700 py-2 px-2'>
                <h1 className='font-bold text-gray-50 text-left'>{release.version.replace("Blender ", "")}</h1>
                <div className={`font-bold text-left text-green-400`}>{release.variant.charAt(0).toUpperCase() + release.variant.slice(1)}</div>
                <p className='text-sm text-white opacity-50 flex justify-end items-center'>{release.dateReleased}</p>
                <button 
                    onClick={() => downloadVersion(release.link)}
                    className='w-8 flex items-center justify-center ml-auto mr-2 bg-blue-500'>
                    <FaDownload className='text-white' />
                </button>
            </div>
        )}
    </div>
}