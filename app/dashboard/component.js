"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var mockLights = [
    { name: 'Christmas Tree',
        rfCode: 1,
        on: true },
    { name: 'Not In Use',
        rfCode: 2,
        on: false },
    { name: 'Not In Use',
        rfCode: 3,
        on: false },
    { name: 'Breakfast Nook',
        rfCode: 4,
        on: false },
    { name: 'Craft Room',
        rfCode: 5,
        on: false }
];
var Dashboard = (function () {
    function Dashboard() {
    }
    Dashboard.prototype.ngOnInit = function () {
        this.switches = mockLights;
    };
    Dashboard.prototype.switch = function (direction, id) {
    };
    Dashboard = __decorate([
        core_1.Component({
            selector: '<dashboard>',
            templateUrl: 'app/dashboard/template.html',
            styleUrls: ['app/dashboard/style.css']
        }), 
        __metadata('design:paramtypes', [])
    ], Dashboard);
    return Dashboard;
}());
exports.Dashboard = Dashboard;
//# sourceMappingURL=component.js.map