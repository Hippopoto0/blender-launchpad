import { create } from 'zustand'

interface AlphaVersionsState {
    links: string[]
}

const useAlphaVersionsStore = create<AlphaVersionsState>()((set) => ({
    links: ["testing", "blah blah"]
}))

export default function VersionsList() {
    const links = useAlphaVersionsStore((state) => state.links)
    return <div>
        {links.map((item) =>
            <h1>{item}</h1>
        )}
    </div>
}