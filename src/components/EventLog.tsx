import React from 'react';
import { IEventLogProps } from '../types';
import '../assets/eventlog.scss'

const getEventDateTime = (time: string) => {
  const dateTime = new Date(time);
  if (isNaN(dateTime.getTime())) return '----'

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let formattedTime = ''

  if (dateTime.getHours() !== 0 && dateTime.getMinutes() !== 0 && dateTime.getSeconds() !== 0) {
    formattedTime = ` @ ${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`;
  }

  return `${dayNames[dateTime.getDay()]} ${dateTime.getDate()} ${monthNames[dateTime.getMonth()]} ${dateTime.getFullYear()} ${formattedTime}`;
}

const EventLog: React.FC<IEventLogProps> = ({events}) => {

  // Do the same as above but make it look like a table
  return (
    <div className="event-log">
      <h1>Event Log</h1>
      {events.map((event, index) => (
        <article key={index}>
          <i>{index + 1}</i>
          <div>
            <time>{getEventDateTime(event.time)}</time>
          </div>
          <div>
            <h2>{event.event}</h2>
          </div>
          <div>
            <p>{event.description ? event.description : '-'}</p>
          </div>

        </article>
      ))}
    </div>
  )
}


export default EventLog;
