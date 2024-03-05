import { useState, useEffect } from 'react'
import './App.css'

interface RecordedSound {
  src: string
  time: string
  inferences: Inference[]
}

interface Inference {
  time: string
  category: string
  rawScore: number
  smoothedScore: number
}

interface Image {
  src: string
  time: string
  inferences: Inference[]
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
  const [sighting, setSighting] = useState<Sighting | null>(null)

  useEffect(() => {
    fetch('http://json.buzzcopper.org/2024/03/04/a1816a52-da0a-11ee-9685-3030f93453f4/Sighting.json')
      .then(response => response.json())
      .then(data => setSighting(data.sighting))
  }, [])

  useEffect(() => {
    if (sighting) {
      console.log(sighting)
    }
  }
  , [sighting])

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
