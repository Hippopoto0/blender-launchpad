import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import "./index.css"

import { appWindow } from '@tauri-apps/api/window'

import { startMessageListener } from "./messaging/MessageHandler";
import { fetchBranchBuilds, fetchDailyBuilds, VersionsListBranch, VersionsList } from "./features/scraper/VersionsList";
import { BlenderInstance, fetchDownloadedInstances, useInstancesStore } from "./features/instances/InstanceManager";
import InstanceThumbnail from "./features/thumbnails/InstanceThumbnail";
import DownloadingThumbnailList from "./features/thumbnails/DownloadThumbnailList";
import TitleBar from "./TitleBar";
import SearchDialog from "./SearchDialog";





function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const instances = useInstancesStore((state) => state.instances)

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  useEffect(() => {
    startMessageListener()
    fetchDownloadedInstances()
    fetchDailyBuilds()
    fetchBranchBuilds()

    if (typeof document === 'undefined') return
    document
      .getElementById('titlebar-minimize')!
      .addEventListener('click', () => appWindow.minimize())
    document
      .getElementById('titlebar-maximize')!
      .addEventListener('click', () => appWindow.toggleMaximize())
    document
      .getElementById('titlebar-close')!
      .addEventListener('click', () => appWindow.close())
  }, [])

  return (
    <main className="w-full h-screen flex flex-col relative bg-slate-700">
      <TitleBar />
      <SearchDialog />
      <div id="spacer" className="h-8 w-full"></div>
      <div className="flex m-4 flex-row flex-wrap justify-start items-start">
        <DownloadingThumbnailList />
        {instances.map((instance: BlenderInstance) =>
          <InstanceThumbnail variant={instance.variant} version={instance.version} path={instance.path} />
        )}
      </div>
    </main>
  );
}

export default App;
