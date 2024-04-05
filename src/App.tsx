import { useState, useEffect } from 'react'
import './App.css'
import { useNavigatorOnLine } from './Online'
import Welcome from './components/Welcome'
import Sighting from './components/Sighting'
import EventLog from './components/EventLog'

import { ISighting, IEvent } from './types'

const App = () => {
  const [data, setData] = useState<ISighting | IEvent[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const isOnline = useNavigatorOnLine();
  const [year, month, day, id, type] = window.location.pathname.split('/').slice(1, 6)

  useEffect(() => {
    if (!year || !month || !day || !id) return
    fetch(`https://json.buzzcopper.org/${year}/${month}/${day}/${id}/${type ?? 'sighting'}.json`)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to fetch ${type} data.`)

        return response.json()
      })
      .then(data => {
        console.log(data);
        if (type === 'eventLog' || type === 'sightLog') {
          setData(data.events);
        } else if (type === 'sighting') {
          setData(data.sighting);
        }
      })
      .catch(error => setError(error.message))
  }, [year, month, day, id, type])


  console.log(data);
  if (!isOnline) return <div>Please connect to the internet</div>
  if (error) return <div>Error: {error}</div>
  if (type === 'sighting' && data) return <Sighting sighting={data as ISighting} />
  if (type === 'eventLog' && data){
    return <EventLog events={data as IEvent[]} macAddress={id.replace('Buzz', '')} links={[
      {
        url: `/${year}/${month}/${day}/${id}/sightLog`,
        label: 'View Sight Log'
      }
    ]} />
  }

  if (type === 'sightLog' && data) {
    return <EventLog events={data as IEvent[]} macAddress={id.replace('Buzz', '')} title={'Sight Log'} links={[
      {
        url: `/${year}/${month}/${day}/${id}/eventLog`,
        label: 'View Event Log'
      }
    ]} />
  }

  return <Welcome />
}

export default App
