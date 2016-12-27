import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Location } from '@angular/common'

import 'rxjs/add/operator/switchMap'

import { Switcher } from '../switcher/service'
import { Switch } from '../models/switch'
import { Timer } from '../models/timer'

@Component({
    //moduleId: module.id,
    selector: '<switch-detail>',
    templateUrl: 'app/switchDetail/template.html',
    styleUrls: ['app/switchDetail/style.css']
}) 
export class SwitchDetail implements OnInit {
    @Input()
    selectedSwitch = <Switch>{}
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
                    console.log('setting selectedSwitch to ' + sw.id)
                    this.selectedSwitch = sw
            })
    }

    updateTimeOfDay(timer: Timer) {
        timer.time.am = !timer.time.am;
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