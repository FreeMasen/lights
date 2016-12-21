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
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
require("rxjs/add/operator/switchMap");
var service_1 = require("../switcher/service");
var switch_1 = require("../models/switch");
var SwitchDetail = (function () {
    function SwitchDetail(switcher, route, location) {
        this.switcher = switcher;
        this.route = route;
        this.location = location;
    }
    SwitchDetail.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) {
            return _this.switcher.get(+params['id']);
        })
            .subscribe(function (sw) {
            _this.selectedSwitch = sw;
        });
    };
    SwitchDetail.prototype.goBack = function () {
        this.location.back();
    };
    return SwitchDetail;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", switch_1.Switch)
], SwitchDetail.prototype, "selectedSwitch", void 0);
SwitchDetail = __decorate([
    core_1.Component({
        selector: '<switch-detail>',
        templateUrl: 'app/switchDetail/template.html',
        styleUrls: ['app/switchDetail/style.css']
    }),
    __metadata("design:paramtypes", [service_1.Switcher,
        router_1.ActivatedRoute,
        common_1.Location])
], SwitchDetail);
exports.SwitchDetail = SwitchDetail;
//# sourceMappingURL=component.js.map