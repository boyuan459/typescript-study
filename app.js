"use strict";
//decorator
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class Point {
    // x : number
    // y : number
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // this.x = x;
        // this.y = y;
    }
    distanceTo(otherPoint) {
        return Math.sqrt(Math.pow(otherPoint.x - this.x, 2) + Math.pow(otherPoint.y - this.y, 2));
    }
    toString() {
        return `Point (${this.x}, ${this.y})`;
    }
}
Point.origin = new Point(0, 0);
var TrailPrivilege;
(function (TrailPrivilege) {
    TrailPrivilege[TrailPrivilege["readCoordinates"] = 0] = "readCoordinates";
    TrailPrivilege[TrailPrivilege["writeCoordinates"] = 1] = "writeCoordinates";
    TrailPrivilege[TrailPrivilege["addPoints"] = 2] = "addPoints";
    TrailPrivilege[TrailPrivilege["getDistance"] = 3] = "getDistance";
})(TrailPrivilege || (TrailPrivilege = {}));
const currentUser = {
    userID: 'TK123',
    privileges: new Set([TrailPrivilege.readCoordinates, TrailPrivilege.addPoints, TrailPrivilege.getDistance])
};
function methodRequiresPermission(privilege) {
    return function (target, propertyKey, descriptor) {
        const originalValue = descriptor.value;
        descriptor.value = function (...args) {
            if (currentUser.privileges.has(privilege)) {
                return originalValue.apply(this, args);
            }
            else {
                console.log("You are not authorized for this action");
            }
        };
        return descriptor;
    };
}
function accessorRequiresPermission(readPrivilege, writePrivilege) {
    return function (target, propertyKey, descriptor) {
        if (!currentUser.privileges.has(readPrivilege)) {
            descriptor.get = () => console.log(`No permission to read property ${propertyKey}`);
        }
        if (!currentUser.privileges.has(writePrivilege)) {
            descriptor.set = () => console.log(`No permission to write property ${propertyKey}`);
        }
        return descriptor;
    };
}
function logInstanceCreation(target) {
    class C extends target {
        constructor(...args) {
            console.log("New " + target.name + " instance created");
            super(...args);
        }
    }
    return C;
}
let Trail = class Trail {
    constructor() {
        this._coordinates = [];
    }
    get coordinates() {
        return this._coordinates;
    }
    set coordinates(coordinates) {
        this._coordinates = coordinates;
    }
    add(point) {
        this._coordinates.push(point);
        return this;
    }
    totalDistance() {
        let total = 0;
        for (let index = 1; index < this._coordinates.length; index++) {
            total += this._coordinates[index].distanceTo(this._coordinates[index - 1]);
        }
        return total;
    }
};
__decorate([
    accessorRequiresPermission(TrailPrivilege.readCoordinates, TrailPrivilege.writeCoordinates),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], Trail.prototype, "coordinates", null);
__decorate([
    methodRequiresPermission(TrailPrivilege.addPoints),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Point]),
    __metadata("design:returntype", Trail)
], Trail.prototype, "add", null);
__decorate([
    methodRequiresPermission(TrailPrivilege.getDistance),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Number)
], Trail.prototype, "totalDistance", null);
Trail = __decorate([
    logInstanceCreation,
    __metadata("design:paramtypes", [])
], Trail);
const trail = new Trail();
trail.add(new Point(0, 0));
console.log(trail.coordinates);
console.log(trail.totalDistance());
