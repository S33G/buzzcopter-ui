import { useState, useEffect } from 'react'
import './App.css'
import { useNavigatorOnLine } from './Online'

interface ImageInference {
  description: string
  score: string
}

interface RecordedSound {
  src: string
  time: string
  inferences: SoundInference[]
}

interface SoundInference {
  time: string
  category: string
  rawScore: number
  smoothedScore: number
}

interface Image {
  src: string
  time: string
  inferences: ImageInference[]
}

interface Sighting {
  uuid: string
  date: string
  time: string
  timezone: string
  latLong: string
  locDescription: string
  reportingArea: string
  reportingLanguage: string
  deviceEmail: string
  recordedSounds: RecordedSound[]
  images: Image[]
}

function App() {
  const [sightingId, setSightingId] = useState<string>('')
  const [sighting, setSighting] = useState<Sighting | null>(null)
  const [error, setError] = useState<string | null>(null)
  const isOnline = useNavigatorOnLine();

  useEffect(() => {
    if (!sightingId) return
    // TODO: How might we support sightings in different months / years?
    fetch(`http://json.buzzcopper.org/2024/03/04/${sightingId}/sighting.json`)
      .then(response => {
        if (!response.ok) throw new Error('Invalid Sighting ID')

        return response.json()
      })
      .then(data => {setSighting(data.sighting)})
      .catch(error => setError(error.message))
  }, [sightingId])

  // Fix: Add type assertion to event target
  if (!sightingId) return (
    <form onSubmit={(e) => {
      setSightingId((e.currentTarget.elements[0] as HTMLInputElement).value)
      e.preventDefault()
    }}>
      <h1>Enter a Sighting ID</h1>
      <input
        type="text"
        defaultValue={'a1816a52-da0a-11ee-9685-3030f93453f4'}
        width={100}
      />
      <input type="submit" value="Submit" />
      <input type="button" value="Demo" onClick={() => setSightingId('a1816a52-da0a-11ee-9685-3030f93453f4')} />
      <input type="button" value="Demo (error)" onClick={() => setSightingId('404-404-404')} />
    </form>
  )

  if (!isOnline) return <div>Please connect to the internet</div>
  if (!sightingId) return (
    <form onSubmit={(e) => {
      setSightingId((e.currentTarget.elements[0] as HTMLInputElement).value)
      e.preventDefault()
    }}>
      <h1>Enter a Sighting ID</h1>
      <input
        type="text"
        defaultValue={'a1816a52-da0a-11ee-9685-3030f93453f4'}
        width={100}
      />
      <input type="submit" value="Submit" />
      <input type="button" value="Demo" onClick={() => setSightingId('a1816a52-da0a-11ee-9685-3030f93453f4')} />
      <input type="button" value="Demo (error)" onClick={() => setSightingId('404-404-404')} />
    </form>
  )
  if (error) return <div>Error: {error}</div>
  if (!sighting) return <div>Loading...</div>

  return (
    <>
      {sighting && (
        <>
          <div>
            <h1>Sighting Info</h1>
            <p>UUID: {sighting.uuid}</p>
            <p>Date: {sighting.date}</p>
            <p>Time: {sighting.time}</p>
            <p>Timezone: {sighting.timezone}</p>
            <p>Coordinates: {sighting.latLong}</p>
            <p>Location: {sighting.locDescription}</p>
            <p>Area: {sighting.reportingArea}</p>
            <p>Language: {sighting.reportingLanguage}</p>
            <p>Device: {sighting.deviceEmail}</p>
          </div>

          <div>
            <h1>Images</h1>
            {sighting.images.map((image, index) => (
              <div key={index}>
                <h2>Image {index + 1}</h2>
                <p>Time: {image.time}</p>
                <img src={image.src} alt="Sighting" />
                <h3>Inferences</h3>
                {image.inferences.map((inference, index) => (
                  <div key={index}>
                    <p>Description: {inference.description}</p>
                    <p>Score: {inference.score}</p>
                    <hr />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div>
            <h1>Sounds</h1>
            {sighting.recordedSounds.map((sound, index) => (
              <div key={index}>
                <h2>Sound {index + 1}</h2>
                <p>Time: {sound.time}</p>
                <audio controls src={sound.src}></audio>
                <h3>Inferences</h3>
                {sound.inferences.map((inference, index) => (
                  <div key={index}>
                    <p>Time: {inference.time}</p>
                    <p>Category: {inference.category}</p>
                    <p>Raw Score: {inference.rawScore}</p>
                    <p>Smoothed Score: {inference.smoothedScore}</p>
                    <hr />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default App
