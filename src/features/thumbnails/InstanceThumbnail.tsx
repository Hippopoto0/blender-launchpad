import { HiPlay } from "react-icons/hi";
import { BlenderInstance } from "./ThumbnailManager";
import { GrPlayFill } from "react-icons/gr";
import { RiPlayLargeFill } from "react-icons/ri";
import { useState } from "react";


export default function InstanceThumbnail(props: BlenderInstance) {
    const [isHovering, setHovering] = useState(false)
    return <div 
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
                {
                    "stable": <p className="absolute font-bold right-2 bottom-2 text-green-400">Stable</p>,
                    "alpha": <p className="absolute font-bold right-2 bottom-2 text-red-400">Alpha</p>,
                    "candidate": <p className="absolute font-bold right-2 bottom-2 text-sky-400">Candidate</p>,
                }[props.variant]
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
}