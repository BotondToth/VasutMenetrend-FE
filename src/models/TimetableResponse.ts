export interface TimetableState {
    timetables: TimeTable[]
}

export interface Station {
    city: string,
    id: string,
    name: string,
    postCode: number
}

export interface Ticket {
    bicyclePrice: number,
    distance: number,
    firstClassPrice: number,
    id: string,
    secondClassPrice: number
}

export interface Train {
    id: string,
    limit: number,
    trainNum: string
}

export interface TimeTable {
    date: Date,
    duration: number,
    end: Station,
    id: string,
    start: Station,
    stops: Station[],
    ticket: Ticket
    train: Train
}