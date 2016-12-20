import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MaterialModule } from '@angular/material'

import { AppComponent } from './app.component'
import { Dashboard } from './dashboard/component'

import { Router } from './router/module'

import './rxjs-extensions'

@NgModule({
    imports: [
        BrowserModule,
        Router,
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
        Dashboard
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }