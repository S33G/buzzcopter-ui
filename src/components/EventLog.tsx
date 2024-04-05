import React from 'react';
import { IEventLogProps } from '../types';
import '../assets/eventlog.scss'
import { Logo } from './Welcome';

const getEmojiForEvent = (event: string): string => {
  const emojiMap = {
    'completed': '✅',
    'read': '📖',
    'email sent': '📨',
    'Battery': '🔋',
    'Boot': '👢',
    'Wifi': '📶',
    'NTP': '🕒',
    'Job Complete': '🎉',
    'Done GCS upload': '📤',
    'Sleep': '💤',
    'Start listening': '🐝',
  };

  for (const key in emojiMap) {
    if (event.toLowerCase().includes(key.toLowerCase())) {
      return emojiMap[key];
    }
  }

  return '🐝';
}

const EventLog: React.FC<IEventLogProps> = ({events, macAddress}) => {
  return(
    <div className="event-log">
      <Logo style={{
        display: 'flex',
        width: '300px',
        objectFit: 'cover',
        margin: '0 auto',
        alignItems: 'center',
        textAlign: 'center',
      }} />
      <h1 style={{ textAlign: 'center' }}>Event Log</h1>
      <p style={{ textAlign: 'center' }}>
        <strong>MAC Address:</strong> {macAddress}
      </p>
      <p style={{ textAlign: 'center' }}>
        {events.length} events recorded
      </p>

      {events.map((event, index) => (
        <article key={index}>
          <div className="emoji">
            {event.emoji ? event.emoji : getEmojiForEvent(event.event)}
            {}
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
