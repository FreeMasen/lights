import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '@angular/material'
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component'
import { Dashboard } from './dashboard/component'
import { Switcher } from './switcher/service'
import { SwitchDetail } from './switchDetail/component'

import { Router } from './router/module'

import './rxjs-extensions'
import 'hammerjs'

@NgModule({
    imports: [
        BrowserModule,
        Router,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
        Dashboard,
        SwitchDetail
    ],
    providers: [
        Switcher
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }