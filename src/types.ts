export interface IImageInference {
    description: string
    score: string
}

export interface IRecordedSound {
    src: string
    time: string
    inferences: ISoundInference[]
}

export interface ISoundInference {
    time: string
    category: string
    rawScore: number
    smoothedScore: number
}

export interface IImage {
    src: string
    time: string
    inferences: IImageInference[]
}

export interface ISighting {
    uuid: string
    date: string
    time: string
    timezone: string
    latLong: string
    locDescription: string
    reportingArea: string
    reportingLanguage: string
    deviceEmail: string
    recordedSounds: IRecordedSound[]
    images: IImage[]
}

export interface IEvent {
    time: string;
    event: string;
    description: string;
  }

export interface IEventLogProps {
    events: IEvent[];
}
