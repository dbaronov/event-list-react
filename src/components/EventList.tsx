import React, { useEffect, useState, useReducer, useTransition, useCallback, useMemo } from 'react'
import { range } from 'lodash'
import data from '../data/data.json'
import { Event } from '../schema'
import { TagFiltersSection } from '../components/tag-filters/TagFilters'
import { eventsFilter } from '../eventsFilter'
import { TextSearch } from '../components/text-search/TextSearch'
import RadioGroup from '../components/radio-group/RadioGroup'
import Listing from '../components/listing/Listing'

class EventListState {
    remoteData: Event[] = []
    searchInput: string = ""
    typeSwitch: string = "All"
    selectedTags: string[] = []
    pagination: { skip: number, limit: number } = { skip: 0, limit: 10 }
}

type Action =
    | { type: 'loadEvents', payload: Event[] }
    | { type: 'updateSearchInput', payload: string }
    | { type: 'updateRadioGoupValue', payload: string }
    | { type: 'updateSelectedTags', payload: string[] }


function reducer(state: EventListState, action: Action): EventListState {
    switch (action.type) {
        case 'loadEvents':
            // return { ...state, remoteData: action.payload }
            return Object.assign({}, state, { remoteData: action.payload })
        case 'updateSearchInput':
            // return { ...state, searchInput: action.payload }
            console.log(action.payload)
            return Object.assign({}, state, { searchInput: action.payload })
        case 'updateRadioGoupValue':
            // return { ...state, typeSwitch: action.payload }
            return Object.assign({}, state, { typeSwitch: action.payload })
        case 'updateSelectedTags':
            // return { ...state, selectedTags: action.payload }
            return Object.assign({}, state, { selectedTags: action.payload })
        default:
            return state
    }
}

export const EventList = () => {
    const [state, dispatch] = useReducer(reducer, new EventListState())
    const [isPending, startTransition] = useTransition()

    const [filtersVisible, setFiltersVisible] = useState(false)
    const [dataFetched, setDataFetched] = useState<boolean>(false)
    const [skip, setSkip] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)


    const filteredEvents = eventsFilter(state.remoteData, {
        searchTerm: state.searchInput,
        typeSwitch: state.typeSwitch,
        tags: state.selectedTags
    })

    if (skip > filteredEvents.length) {
        setSkip(Math.floor(filteredEvents.length / limit) * limit)
    }

    const totalPages = Math.ceil(filteredEvents.length / limit)
    const currentPage = skip / limit + 1

    useEffect(() => {
        startTransition(() => {
            setTimeout(() => {
                dispatch({ type: 'loadEvents', payload: data.eventCardList })
            }, 2000)
        })
    }, [])

    const options = useMemo(() => ["All", "Webinar", "Seminar"], [])
    const onInputChange = useCallback((newTextValue: string) => dispatch({ type: 'updateSearchInput', payload: newTextValue }), [])
    const onRadioChange = useCallback((newValue: string) => dispatch({type: "updateRadioGoupValue", payload: newValue}), [])
    const onTagsChange = useCallback((selectedTags: string[]) => dispatch({type: "updateSelectedTags", payload: selectedTags}), [])
    
    return (
        <div className="app events">
            <TextSearch value={state.searchInput} onChange={ onInputChange } />

            <div className="events_event-type">
                <RadioGroup options={options} value={state.typeSwitch} onChange={ onRadioChange } />
            </div>

            <div className="events_tag-filter">
                <input type="button" tabIndex={0} onClick={() => setFiltersVisible(filtersVisible ? false : true)} value={ filtersVisible ? `open filters` : `close filters` }/> <span className="events_tag-counter">{ state.selectedTags.length ? state.selectedTags.length : `...`  }</span>
                {filtersVisible && <TagFiltersSection tags={data.tagFilters} selected={state.selectedTags} onChange={onTagsChange} />}
            </div>

            {!isPending ?
                <Listing eventsData={{ eventCardList: filteredEvents.slice(skip, skip + limit) }} />
                :
                "Loading data..." // this does not work
            }

            {filteredEvents.length > limit && (
            <div className="pagination-navigation">
                <button disabled={skip <= 0} onClick={() => setSkip(skip - limit)}>
                    Prev page
                </button>

                {/* Always show the first page */}
                {currentPage > 1 && (
                <>
                    <button onClick={() => setSkip(0)}>1</button>
                    <button disabled>...</button>
                </>
                )}

                {/* Show a range of pages around the current page */}
                {range(Math.max(currentPage - 1, 0), Math.min(currentPage + 1, totalPages)).map(i => (
                <button
                    key={i}
                    disabled={i + 1 === currentPage}
                    onClick={() => setSkip(i * limit)}
                >
                    {i + 1}
                </button>
                ))}

                {/* Always show the last page */}
                {currentPage < totalPages - 2 && (
                <>
                    <button disabled>...</button>
                    <button onClick={() => setSkip((totalPages - 1) * limit)}>{totalPages}</button>
                </>
                )}

                <button
                    disabled={(skip + limit) >= filteredEvents.length}
                    onClick={() => setSkip(skip + limit)}
                    >
                    Next page
                </button>
            </div>
            )}
        </div>
    )
}
