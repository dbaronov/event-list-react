import React, { useState, memo } from 'react'
import { range } from 'lodash'

import { Event } from '../../schema'

export class NavigationState {
  skip: number = 0
  limit: number = 10
}

interface PaginationNavigationProps {
  // filteredEvents: Event[]
  // onClick: (tagValue: string) => void
  pagination: NavigationState,
  totalObjects: number,
  onChange: (newPagination: NavigationState) => void
}

export const PaginationNavigation = memo(( props: PaginationNavigationProps) => {

  const {skip, limit} = props.pagination
  const totalPages = Math.ceil(props.totalObjects / limit)
  const currentPage = skip / limit + 1

  return (
      <div className="pagination-navigation">
        <button
          disabled={skip <= 0}
          onClick={() => {props.onChange({skip: skip-limit, limit: limit})}}
        >
          Prev page
        </button>

        {/* Always show the first page */}
        {currentPage > 1 && (
          <>
            <button onClick={() => props.onChange({skip: 0, limit: limit})}>1</button>
            <button disabled>...</button>
          </>
        )}

        {/* Show a range of pages around the current page */}
        {range(Math.max(currentPage - 1, 0), Math.min(currentPage + 1, totalPages)).map(i => (
          <button
            key={i}
            disabled={i + 1 === currentPage}
            onClick={() => props.onChange({skip: i * limit, limit: limit})}
          >
            {i + 1}
          </button>
        ))}

        {/* Always show the last page */}
        {currentPage < totalPages - 2 && (
          <>
            <button disabled>...</button>
            <button onClick={() => props.onChange({skip: (totalPages - 1) * limit, limit: limit})}>{totalPages}</button>
          </>
        )}

        <button
          disabled={(skip + limit) >= props.totalObjects}
          onClick={() => props.onChange({skip: skip + limit, limit: limit})} >
          Next page
        </button>
      </div>
  )
})
