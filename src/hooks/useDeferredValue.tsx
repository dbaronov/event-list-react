import { useDeferredValue, useState } from "react"
import { SlowList } from "./components/SlowList"

export const DeferredValue = () => {
    const [query, setQuery] = useState("")
    const deferredQuery = useDeferredValue(query)

    return (
        <div className="tutorial">
            <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search..."
                className="text" />

            <SlowList text={deferredQuery} />
        </div>
    )
}
