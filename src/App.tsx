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
import VersionsList, { fetchDailyBuilds } from "./features/scraper/VersionsList";





function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  useEffect(() => {
    startMessageListener()
    fetchDailyBuilds()

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
    <main className="w-full h-screen flex flex-col relative">
      <div data-tauri-drag-region className="titlebar">
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
          <Button className="absolute bottom-5 left-5">
            <FaRegPlusSquare className="text-white" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Instance</DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
          </DialogHeader>
          <div>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="w-full items-start justify-start">
              <TabsTrigger value="alpha">Alpha</TabsTrigger>
              <TabsTrigger value="daily">Daily</TabsTrigger>
            </TabsList>
            <TabsContent value="alpha">
              <VersionsList />
            </TabsContent>
            <TabsContent value="daily"></TabsContent>
          </Tabs>

          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={async () => {
                console.log(await invoke("run_downloader", { path: await appDataDir(), url: "https://cdn.builder.blender.org/download/daily/archive/blender-4.3.0-alpha+main.e114467a5463-windows.amd64-release.zip"}))
                console.log(await appDataDir())

              }}>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div id="spacer" className="h-8 w-full"></div>
      <div className="flex-1 m-4">
        <DownloadingThumbnail />
      </div>
    </main>
  );
}

export default App;
