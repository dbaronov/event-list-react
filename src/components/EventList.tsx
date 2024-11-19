import { range } from 'lodash'
import React, { useEffect, useState, useReducer } from 'react'
import { TagFiltersSection } from '../components/tag-filters/TagFilters'
import Listing from '../components/listing/Listing'
import RadioGroup from '../components/radio-group/RadioGroup'
import {Event } from '../schema'
import data from '../data/data.json'
import { eventsFilter } from '../eventsFilter'

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
            return { ...state, remoteData: action.payload }
        case 'updateSearchInput':
            return { ...state, searchInput: action.payload }
        case 'updateRadioGoupValue':
            return { ...state, typeSwitch: action.payload }
        case 'updateSelectedTags':
            return { ...state, selectedTags: action.payload }
        default:
            return state
    }
}

export const EventList = () => {
    const [state, dispatch] = useReducer(reducer, new EventListState())

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
        setTimeout(() => {
            dispatch({ type: 'loadEvents', payload: data.eventCardList })
            setDataFetched(true)
        }, 2000)
    }, [])

    const options = ["All", "Webinar", "Seminar"]

    return (
        <div className="app events">
            <form>
                <div className="events_text-input">
                    <svg width="30px" height="30px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                            fill="#6d6d6d"
                        />
                    </svg>
                    <input type="text" placeholder="Search events" onChange={ e => dispatch({ type: 'updateSearchInput', payload: e.target.value })} />
                    <input type="button" disabled tabIndex={0} value={filteredEvents.length || ". . ."} />
                    <input type="reset" name="reset" tabIndex={0} value="✕" aria-label="Clear text input" />
                </div>
            </form>

            <div className="events_event-type">
                <RadioGroup options={options} value={state.typeSwitch} onChange={newValue => dispatch({type: "updateRadioGoupValue", payload: newValue})} />
            </div>

            <div className="events_tag-filter">
                <input type="button" tabIndex={0} onClick={() => setFiltersVisible(filtersVisible ? false : true)} value={!filtersVisible ? `open filters` : `close filters`}/> <span className="events_tag-counter">{ state.selectedTags.length ? state.selectedTags.length : `...`  }</span>
                {filtersVisible && <TagFiltersSection tags={data.tagFilters} selected={state.selectedTags} onChange={selectedTags => dispatch({type: "updateSelectedTags", payload: selectedTags})} />}
            </div>

            {dataFetched ?
                <Listing eventsData={{ eventCardList: filteredEvents.slice(skip, skip + limit) }} />
                :
                "Loading data..."
            }

            {filteredEvents.length > limit &&
                <div className="pagination-navigation">
                    <button disabled={skip <= 0} onClick={() => setSkip(skip - limit)}>Prev page</button>

                    {range(totalPages).map(i =>
                        <button key={i} disabled={(i + 1) === currentPage} onClick={() => setSkip(i * limit)}>{i + 1}</button>
                    )}

                    <button disabled={(skip + limit) >= filteredEvents.length} onClick={() => setSkip(skip + limit)}>Next page</button>
                </div>
            }

        </div>
    )
}
