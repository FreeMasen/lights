import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Location } from '@angular/common'

import 'rxjs/add/operator/switchMap'

import { Switcher } from '../switcher/service'
import { Switch } from '../models/switch'
import { Timer } from '../models/timer'
import { Time } from '../models/time'
import { Days } from '../models/days'

@Component({
    selector: '<switch-detail>',
    templateUrl: 'app/switchDetail/template.html',
    styleUrls: ['app/switchDetail/style.css']
}) 
export class SwitchDetail implements OnInit {
    @Input()
    selectedSwitch = <Switch>{}
    preservedSwitch = <Switch>{}
    constructor(
        private switcher: Switcher,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit() :void {
        console.log('switchDetail.ngOnInit()')
        this.route.params
            .switchMap((params: Params) => {
                return this.switcher.get(+params['id'])
            })
            .subscribe(sw => {
                    console.log(sw)
                    this.selectedSwitch = sw
                    this.preservedSwitch = this.copySwitch(sw)
            })
    }
    
    saveSwitch() {
        console.log('saveTimer')
    }

    revertChanges() {
        console.log('reverting changes')
        this.selectedSwitch = this.copySwitch(this.preservedSwitch)
    }

    copySwitch(sw: Switch) {
        let ret = new Switch(sw.id, sw.on, sw.name)
        sw.timers.forEach(timer => {
            let t = new Timer()
            t.isOn = timer.isOn
            let newTime = new Time()
            newTime.hour = timer.time.hour
            newTime.minute = timer.time.minute
            newTime.am = timer.time.am
            t.time = newTime
            let newDays = new Days()
            for (var k in timer.days) {
                newDays[k] = timer.days[k]
            }
            t.days = newDays
            ret.timers.push(new Timer())
        })
        return ret
    }


    updateTimeOfDay(timer: Timer) {
        timer.time.am = !timer.time.am;
    }

    updateEnabled(day: string, timer: Timer) {
        console.log('updateEnabled')
        timer.days[day] = !timer.days[day]
    }

    changeDirection(timer) {
        timer.isOn = !timer.isOn
    }



    addTimer() {
        this.selectedSwitch.timers.push(new Timer())
    }

    displayMessage(message) {
        console.log(message)
    }

    goBack(): void {
        this.location.back()
    }
}