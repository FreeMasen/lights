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
var core_1 = require("@angular/core");
var service_1 = require("../switcher/service");
var Dashboard = (function () {
    function Dashboard(switcher) {
        this.switcher = switcher;
    }
    Dashboard.prototype.ngOnInit = function () {
        var _this = this;
        this.switcher
            .getSwitches()
            .then(function (switches) {
            _this.switches = switches;
        })
            .catch(function (_) {
            _this.switches = [];
            console.error('switches.catch');
        });
    };
    Dashboard.prototype.flip = function (sw, direction) {
        var _this = this;
        this.switcher.flip(sw, direction)
            .then(function (newSw) {
            _this.switches.forEach(function (existing) {
                if (newSw.id == existing.id) {
                    existing = newSw;
                    return;
                }
            });
        }).catch(function (_) {
            _this.message = "Error updating switch";
        });
    };
    return Dashboard;
}());
Dashboard = __decorate([
    core_1.Component({
        selector: '<dashboard>',
        templateUrl: 'app/dashboard/template.html',
        styleUrls: ['app/dashboard/style.css']
    }),
    __metadata("design:paramtypes", [service_1.Switcher])
], Dashboard);
exports.Dashboard = Dashboard;
//# sourceMappingURL=component.js.map