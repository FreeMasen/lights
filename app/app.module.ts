import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MaterialModule } from '@angular/material'
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component'
import { Dashboard } from './dashboard/component'
import { Switcher } from './switcher/service'

import { Router } from './router/module'

import './rxjs-extensions'

@NgModule({
    imports: [
        BrowserModule,
        Router,
        HttpModule,
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
        Dashboard
    ],
    providers: [
        Switcher
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }