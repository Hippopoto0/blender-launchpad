import { HiPlay } from "react-icons/hi";
import { BlenderInstance, deleteInstance, launchInstance } from "../instances/InstanceManager";
import { GrPlayFill } from "react-icons/gr";
import { RiPlayLargeFill } from "react-icons/ri";
import { useState } from "react";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

function renderVariantText(instance: BlenderInstance) {
    if (instance.variant == "stable") {
        return <p className="absolute font-bold text-sm right-2 bottom-2 text-green-400">Stable</p>
    } else if (instance.variant == "alpha") {
        return <p className="absolute font-bold text-sm right-2 bottom-2 text-red-400">Alpha</p>
    } else if (instance.variant == "candidate") {
        return <p className="absolute font-bold text-sm right-2 bottom-2 text-blue-400">Candidate</p>
    } else {
        return <p className="absolute font-bold text-xs right-2 bottom-2 text-orange-400">{instance.variant}</p>
    }
}

export default function InstanceThumbnail(props: BlenderInstance) {
    const [isHovering, setHovering] = useState(false)

    return <ContextMenu>
        <ContextMenuTrigger>
            <div 
                    onClick={() => launchInstance(props.path)}
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    className="w-48 h-32 rounded-md overflow-hidden relative shadow-md m-2 shrink-0 cursor-pointer">
                <img className="absolute top-0 left-0" src={`https://picsum.photos/seed/${props.version}/300/200/`} alt="oops" />
                <div className="absolute top-0 left-0 w-full h-full bg-slate-600/70 flex items-center justify-center">
                </div>
                <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
                    <h1 className="font-bold text-2xl text-white shadow-xl">{props.version}</h1>
                    {/* <p className="absolute right-2 bottom-2">
                    </p> */}
                    {
                    renderVariantText(props)
                        // {
                        //     "stable": <p className="absolute font-bold right-2 bottom-2 text-green-400">Stable</p>,
                        //     "alpha": <p className="absolute font-bold right-2 bottom-2 text-red-400">Alpha</p>,
                        //     "candidate": <p className="absolute font-bold right-2 bottom-2 text-sky-400">Candidate</p>,

                        // }[props.variant]
                    }
                </div>
                {/* Hover controls */}
                <div 
                    className={`absolute top-0 left-0 w-full h-full 
                    bg-slate-900/70 opacity-0 ${isHovering && "opacity-100"}  transition-all`}
                ></div>
                <div className={`
                    absolute top-0 left-0 w-full h-full flex items-center justify-center
                `}>
                    <RiPlayLargeFill size={70} className={`text-green-500 opacity-0 ${isHovering && "scale-75 opacity-100"} transition-all`} />
                </div>
            </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64 dark bg-slate-600 border-white/20">
            <ContextMenuItem inset>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem inset disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem inset>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
                <ContextMenuItem>
                Save Page As...
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                <ContextMenuItem>Name Window...</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem checked>
            Show Bookmarks Bar
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuRadioGroup value="pedro">
            <ContextMenuLabel inset>People</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuRadioItem value="pedro">
                Pedro Duarte
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
            <ContextMenuSeparator />
            <ContextMenuItem 
                onClick={() => deleteInstance(props.path)}
                inset className="text-red-400">
                Delete
                <ContextMenuShortcut>
                    Del
                </ContextMenuShortcut>
            </ContextMenuItem>
        </ContextMenuContent>
    </ContextMenu>
}