import React from 'react';
import { IEventLogProps } from '../types';
import '../assets/eventlog.scss'

const getEmojiForEvent = (event: string) => {
  const emojiMap = {
    completed: '✅',
    read: '📖',
    'email sent': '📨',
    Battery: '🔋',
    Boot: '👢',
    Wifi: '📶',
    NTP: '🕒',
    'Job Complete': '🎉',
    'Done GCS upload': '📤',
    'Sleep': '💤',
    'Start listening': '👂',

  };

  for (const key in emojiMap) {
    if (event.toLowerCase().includes(key.toLowerCase())) {
      return emojiMap[key];
    }
  }
  return <span role="img" aria-label="event">📝</span>
}

const EventLog: React.FC<IEventLogProps> = ({events}) => {
  return(
    <div className="event-log">
      <h1>Event Log</h1>
      {events.map((event, index) => (
        <article key={index}>
          <div className="emoji">
            {getEmojiForEvent(event.event)}
          </div>
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
}


export default EventLog;
