import { Component } from '@angular/core'
import { OnInit } from '@angular/core'

import { Observable } from 'rxjs'

import { Switcher } from '../switcher/service'

import { Switch } from '../models/switch'
import { Direction } from '../models/direction'
@Component({
    selector: '<dashboard>',
    templateUrl: 'app/dashboard/template.html',
    styleUrls: ['app/dashboard/style.css']
})
export class Dashboard implements OnInit { 
    constructor(private switcher: Switcher) {}
    switches: Switch[]
    message: string
    ngOnInit(): void {
        this.switcher
            .getSwitches()
            .then(switches => {
                this.switches = switches
            })
            .catch(_ => {
                this.switches = []
                console.error('switches.catch')
            })
    }

    flip(sw: Switch, direction: Direction): void {
        this.switcher.flip(sw, direction)
            .then(newSw => {
                this.switches.forEach(existing => {
                    if (newSw.id == existing.id) {
                        existing = newSw
                        return
                    }
                })
            }).catch(_ => {
                this.message = "Error updating switch"
            })
    }
}
