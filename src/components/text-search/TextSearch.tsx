import { memo } from "react";
import { Event } from '../../schema'

interface TextInputProps {
  value: string
  events: Event[]
  onChange: (tagValue: string) => void
}

export const TextSearch = memo((props: TextInputProps) => {

  return (
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
        <input type="text" placeholder="Search events" onChange={(event) => props.onChange(event.target.value)} />
        <button name="counter" id="counter" disabled tabIndex={0}>{props.events.length || ". . ."} </button>
        <input type="reset" name="reset" id="reset" tabIndex={0} value="✕" aria-label="Clear text input" />
      </div>
    </form>
  )
})
