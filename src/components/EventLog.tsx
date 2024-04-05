import React from 'react';
import { IEventLogProps } from '../types';
import '../assets/eventlog.scss'
const EventLog: React.FC<IEventLogProps> = ({events}) => (
  <div className="event-log">
    <h1>Event Log</h1>
    {events.map((event, index) => (
      <article key={index}>
        <i>{index + 1}</i>
        <div>
          <time>{event.time}</time>
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


export default EventLog;
