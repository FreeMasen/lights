import { Timer } from './timer'
export class Switch {
    id: number
    on: boolean
    name: string
    timers: Timer[]
    constructor(id: number, on: boolean, name: string) {
        this.id = id
        this.on = on
        this.name = name
    }
}