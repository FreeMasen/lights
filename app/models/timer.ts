import { Time } from './time'
import { Days } from './days'

export class Timer {
    isOn: boolean = true
    time: Time = new Time()
    days: Days = new Days()
}