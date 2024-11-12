import { DataFilters, Event } from "./schema"

export const eventsFilter = (events: Event[], filters: DataFilters): Event[] => {
    const searchValue = filters.searchTerm.toLowerCase()

    if (filters.searchTerm !== "") {
        const termLower = searchValue.toLowerCase()
        events = events.filter(
            eventItem => (eventItem.title + eventItem.eventDetailDescription).toLowerCase().search(termLower) !== -1
        )
    }

    if (filters.typeSwitch !== "All") {
        events = events.filter(eventItem => eventItem.eventTitle === filters.typeSwitch)
    }

    type SGroupType = {id: string, tags: string[]}
    
    const filterGroups = filters.tags.reduce((acc, tag) => {
        const [group, value] = tag.split(":")

        const gIdx = acc.findIndex((structuredGroup: SGroupType) => structuredGroup.id === group)
        if (gIdx === -1) {
            acc.push({"id": group, "tags": [value]})
        } else {
            acc[gIdx].tags.push(value)
        }
        return acc
    }, [] as SGroupType[])

    for (const group of filterGroups) {
        if (group.tags.length > 0) {
            events = events.filter(
                e => group.tags.some(tag => e.tagIds.includes(`${group.id}:${tag}`))
            )
        }
    }

    return events
}
