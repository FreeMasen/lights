import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Location } from '@angular/common'

import 'rxjs/add/operator/switchMap'

import { Switcher } from '../switcher/service'
import { Switch } from '../models/switch'

@Component({
    //moduleId: module.id,
    selector: '<switch-detail>',
    templateUrl: 'app/switchDetail/template.html',
    styleUrls: ['app/switchDetail/style.css']
}) 
export class SwitchDetail implements OnInit {
    @Input()
    selectedSwitch = <Switch>{}
    pendingTimer
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

    addTimer() {
        if (this.pendingTimer === undefined) {
            return this.displayMessage('Please complete timer form')
        }
        this.selectedSwitch.timers.push(
            this.pendingTimer
        )
        this.pendingTimer = undefined
    }

    displayMessage(message) {
        console.log(message)
    }

    goBack(): void {
        this.location.back()
    }
}