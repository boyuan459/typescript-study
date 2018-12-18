"use strict";
//class
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
class Trail {
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
}
const homePos = new Point(0, 0);
console.log(Point.origin.toString());
console.log(homePos.distanceTo(new Point(0, 1)));
let trail = new Trail();
trail.add(homePos);
trail.add(new Point(0, 1));
trail.add(new Point(1, 1));
// console.log(trail.coordinates);
console.log(trail.totalDistance());
trail.coordinates = [];
console.log(trail.coordinates);
