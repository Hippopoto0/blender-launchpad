import { BlenderInstance } from "./ThumbnailManager";


export default function InstanceThumbnail(props: BlenderInstance) {
    return <div className="w-48 h-32 rounded-md overflow-hidden relative shadow-md">
        <img className="absolute top-0 left-0" src={`https://picsum.photos/seed/${Math.random()}/300/200/`} alt="oops" />
        <div className="absolute top-0 left-0 w-full h-full bg-white/70 flex items-center justify-center">
        </div>
        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
            <h1 className="font-bold text-2xl">{props.version}</h1>
            <p className="absolute right-2 bottom-2">{props.variant}</p>
        </div>
    </div>
}