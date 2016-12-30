import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/toPromise'


import { Switch } from '../models/switch'
import { Direction } from '../models/direction'
@Injectable()
export class Switcher {

    constructor(private http: Http) {}

    getSwitches(): Promise<Switch[]> {
        return this.http
            .get(`/switches`)
            .toPromise()
            .then(response => {
                let data = response.json()
                console.log(typeof data)
                if (!data) throw new Error('no data in response')
                if (typeof data == 'string') data = JSON.parse(data)
                return data as Switch[]
            })
            .catch(this.handleError)
    }

    get(id: number) : Promise<Switch> {
        return this.getSwitches()
            .then(switches => {
                return switches.find(sw => {
                    return sw.id === id
                })
            })
    }

    flip(sw: Switch, direction: Direction): Promise<Switch> {
        return this.http.post(`/flip/${sw.id}/${direction}`, null)
            .toPromise()
            .then(_=> {
                sw.on = direction == Direction.on
                return sw
            }).catch(this.handleError)
    }

    saveSwitch(sw: Switch) {
        this.http.post(`/switch/${sw.id}`,sw)
            .toPromise()
            .then(value=> {
                console.log('saveSwitch')
                console.log(value)
            }).catch(this.handleError)
    }

    private handleError(err: any): Promise<any> {
        console.error('An error occured', err)
        return Promise.reject(err.message || err)
    }
}