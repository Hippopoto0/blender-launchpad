import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import "./index.css"
import { FaRegPlusSquare } from "react-icons/fa";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { createDir, BaseDirectory } from '@tauri-apps/api/fs';
import { appWindow } from '@tauri-apps/api/window'

import { Command } from '@tauri-apps/api/shell'
import { appDataDir, appLocalDataDir } from '@tauri-apps/api/path';
import DownloadingThumbnail from "./features/thumbnails/DownloadingThumbnail";
import { startMessageListener } from "./messaging/MessageHandler";
import { fetchBranchBuilds, fetchDailyBuilds, VersionsListBranch, VersionsList } from "./features/scraper/VersionsList";
import { BlenderInstance, fetchDownloadedInstances, useInstancesStore } from "./features/thumbnails/ThumbnailManager";
import InstanceThumbnail from "./features/thumbnails/InstanceThumbnail";
import { GrAdd } from "react-icons/gr";
import DownloadingThumbnailList from "./features/thumbnails/DownloadThumbnailList";





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
      <div data-tauri-drag-region className="titlebar bg-slate-800">
        <div className="titlebar-button" id="titlebar-minimize">
          <img
            src="https://api.iconify.design/mdi:window-minimize.svg"
            alt="minimize"
          />
        </div>
        <div className="titlebar-button" id="titlebar-maximize">
          <img
            src="https://api.iconify.design/mdi:window-maximize.svg"
            alt="maximize"
          />
        </div>
        <div className="titlebar-button" id="titlebar-close">
          <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="absolute bottom-5 left-5 bg-teal-600 hover:bg-teal-700">
              <GrAdd />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] bg-slate-600 pl-4">
          <DialogHeader>
            <DialogTitle className="text-white">Add Instance</DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
          </DialogHeader>
          <div>
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="items-start justify-start bg-slate-700">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>
            <TabsContent value="daily">
              <VersionsList/>
            </TabsContent>
            <TabsContent value="other">
              <VersionsListBranch />
            </TabsContent>
          </Tabs>

          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button 
                className="bg-teal-600 hover:bg-teal-700"
                type="submit" onClick={async () => {
                console.log(await invoke("run_downloader", { path: await appDataDir(), url: "https://cdn.builder.blender.org/download/daily/archive/blender-4.3.0-alpha+main.e114467a5463-windows.amd64-release.zip"}))
                console.log(await appDataDir())

              }}>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
