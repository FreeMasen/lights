import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { Dashboard } from '../dashboard/component'
import { SwitchDetail } from '../switchDetail/component'

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: Dashboard},
    {path: 'switch/:id', component: SwitchDetail}
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class Router { }