import React, { useEffect, useState, useReducer, useTransition, useCallback, useMemo } from 'react'
import data from '../data/data.json'
import { Event } from '../schema'
import { TagFiltersSection } from '../components/tag-filters/TagFilters'
import { eventsFilter } from '../eventsFilter'
import { TextSearch } from '../components/text-search/TextSearch'
import RadioGroup from '../components/radio-group/RadioGroup'
import Listing from '../components/listing/Listing'
import { PaginationNavigation, NavigationState } from '../components/pagination/PaginationNavigation'
import { produce } from 'immer'

class EventListState {
  remoteData: Event[] = []
  searchInput: string = ""
  typeSwitch: string = "All"
  selectedTags: string[] = []
  pagination: NavigationState = new NavigationState()
}

type Action =
  | { type: 'loadEvents', payload: Event[] }
  | { type: 'updateSearchInput', payload: string }
  | { type: 'updateRadioGoupValue', payload: string }
  | { type: 'updateSelectedTags', payload: string[] }
  | { type: 'updatePagination', payload: NavigationState}

function reducer(state: EventListState, action: Action): EventListState {
  switch (action.type) {
    case 'loadEvents':
      return { ...state, remoteData: action.payload }
    case 'updateSearchInput':
      return Object.assign({}, state, { searchInput: action.payload })
    case 'updateRadioGoupValue':
      return { ...state, typeSwitch: action.payload }
    case 'updateSelectedTags':
      return Object.assign({}, state, { selectedTags: action.payload })
    case 'updatePagination':
      let skip = action.payload.skip
      if(action.payload.skip > state.remoteData.length){
        skip = Math.floor(state.remoteData.length / state.pagination.limit) * state.pagination.limit
      }
      return produce(state, (draft) => {
        draft.pagination = action.payload
      })
    default:
      return state
  }
}

export const EventList = () => {
  const [state, dispatch] = useReducer(reducer, new EventListState())
  const [isPending, startTransition] = useTransition()

  const [filtersVisible, setFiltersVisible] = useState(false)
  const [dataFetched, setDataFetched] = useState<boolean>(false)
  const [skip, setSkip] = useState(0)

  const filteredEvents = eventsFilter(state.remoteData, {
    searchTerm: state.searchInput,
    typeSwitch: state.typeSwitch,
    tags: state.selectedTags
  })

  if (state.pagination.skip > filteredEvents.length) {
    setSkip(Math.floor(filteredEvents.length / state.pagination.limit) * state.pagination.limit)
  }

  // const totalPages = Math.ceil(filteredEvents.length / state.pagination.limit)
  // const currentPage = state.pagination.skip / state.pagination.limit + 1

  useEffect(() => {
    startTransition(() => {
      setTimeout(() => {
        dispatch({ type: 'loadEvents', payload: data.eventCardList })
      }, 2000)
    })
  }, [])

  const options = useMemo(() => ["All", "Webinar", "Seminar"], [])

  const onInputChange = useCallback((newTextValue: string) => dispatch({ type: 'updateSearchInput', payload: newTextValue }), [])
  const onRadioChange = useCallback((newValue: string) => dispatch({ type: "updateRadioGoupValue", payload: newValue }), [])
  const onTagsChange = useCallback((selectedTags: string[]) => dispatch({ type: "updateSelectedTags", payload: selectedTags }), [])
  const onPaginationChange = useCallback((newPagination: NavigationState) => dispatch({type: 'updatePagination', payload: newPagination}), [])

  return (
    <div className="app events">
      <TextSearch value={state.searchInput} onChange={onInputChange} events={filteredEvents} />

      <div className="events_event-type">
        <RadioGroup options={options} value={state.typeSwitch} onChange={onRadioChange} />
      </div>

      <div className="events_tag-filter">
        <input type="button" tabIndex={0} onClick={() => setFiltersVisible(filtersVisible ? false : true)} value={filtersVisible ? `close filters` : `open filters`} /> <span className="events_tag-counter">{state.selectedTags.length ? state.selectedTags.length : `...`}</span>
        {filtersVisible && <TagFiltersSection tags={data.tagFilters} selected={state.selectedTags} onChange={onTagsChange} />}
      </div>

      {!isPending ?
        <Listing eventsData={{ eventCardList: filteredEvents.slice(state.pagination.skip, state.pagination.skip + state.pagination.limit) }} />
        :
        "Loading data..." // this does not work
      }

      {filteredEvents.length > state.pagination.limit && (
        <PaginationNavigation pagination={state.pagination} totalObjects={ filteredEvents.length } onChange={onPaginationChange} />
      )}

    </div>
  )
}
