import { Component } from '@angular/core'
import { OnInit } from '@angular/core'

const mockLights = [
    {name: 'Christmas Tree',
    rfCode: 1,
    on: true},
    {name: 'Not In Use',
    rfCode: 2,
    on: false},
    {name: 'Not In Use',
    rfCode: 3,
    on: false},
    {name: 'Breakfast Nook',
    rfCode: 4,
    on: false},
    {name: 'Craft Room',
    rfCode: 5,
    on: false}
]

@Component({
    selector: '<dashboard>',
    templateUrl: 'app/dashboard/template.html',
    styleUrls: ['app/dashboard/style.css']
})
export class Dashboard { 
    constructor() {}
    switches
    ngOnInit(): void {
        this.switches = mockLights;
    }

    switch(direction: string, id: number) {
        
    }
}
