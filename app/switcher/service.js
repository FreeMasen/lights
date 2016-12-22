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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var direction_1 = require("../models/direction");
var Switcher = (function () {
    function Switcher(http) {
        this.http = http;
    }
    Switcher.prototype.getSwitches = function () {
        return this.http
            .get("/switches")
            .toPromise()
            .then(function (response) {
            var data = response.json();
            if (!data)
                throw new Error('no data in response');
            return data;
        })
            .catch(this.handleError);
    };
    Switcher.prototype.get = function (id) {
        return this.getSwitches()
            .then(function (switches) {
            return switches.find(function (sw) {
                return sw.id === id;
            });
        });
    };
    Switcher.prototype.flip = function (sw, direction) {
        return this.http.post("/" + sw.id + "/" + direction, null)
            .toPromise()
            .then(function (_) {
            sw.on = direction == direction_1.Direction.on;
            return sw;
        }).catch(this.handleError);
    };
    Switcher.prototype.handleError = function (err) {
        console.error('An error occured', err);
        return Promise.reject(err.message || err);
    };
    return Switcher;
}());
Switcher = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], Switcher);
exports.Switcher = Switcher;
//# sourceMappingURL=service.js.map