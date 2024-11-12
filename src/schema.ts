export interface RemoteData {
    filterTagMap: Object
}

export interface Event {
    eventTitle: string,
    eventLabel: string,
    eventLableClass: string,
    eventLink: string,
    title: string,
    dateType: number,
    imgPath: string,
    eventDetailDescription: string,
    tagIds: string[],
    randomId: string,
    lastModifiedDate: number
}

export interface TagFilter {
    filterId: string,
    filterTitle: string,
    filterOptions: {id: string, title: string }[]
}

export type EventType = "All" | "Webinar" | "Seminar"

export interface RadioGroupType {
    options: string[],
    value: string
    setValue: any
}

export interface DataFilters {
    searchTerm: string,
    typeSwitch: string ,
    tags: string[]
}
