import { Event } from '../../schema'

export default function Listing (props: {eventsData: {eventCardList: Event[]}}) {
    return (
    <div className="c-event-list__listing">
        {props.eventsData ? (
          <ul>
            {props.eventsData.eventCardList.map((event, index) => (
              <li key={`${event.randomId}${index}`}>
                <h2>{event.title}</h2>
                <h3>{event.eventTitle} - {event.eventLabel} </h3>
                <p>{event.eventDetailDescription}</p>
                <a href={event.eventLink}>Learn More</a>
                {/* <div className='tags'>
                  { event.tagIds.map((tag, index) => <span key={`${tag}${index}}`}>{tag.split(":")[1]}</span>) }
                </div> */}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading events...</p>
        )}
    </div>
    )
}
