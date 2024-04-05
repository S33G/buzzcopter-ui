import React from 'react';
import { IEventLogProps } from '../types';

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

  return <>
  <h1>Event Log</h1>
    {events.map((event, index) => (
      <article key={index}>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
        <h2 style={{ fontSize: '1.5rem', margin: '0', textAlign: 'left'}}>{event.event}</h2>
          <div style={{ border: '1px solid black', padding: '.25rem', borderRadius: '1rem', width: '2rem', height: '2rem', textAlign: 'center' }}>{index + 1}</div>
        </div>

        <p>{event.description}</p>
        <time style={{ fontSize: '.5rem', margin: '0' }}>{getEventDateTime(event.time)}</time>

        <hr />
      </article>
    ))}
  </>
}


export default EventLog;
