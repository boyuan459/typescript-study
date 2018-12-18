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
class Observation extends Point {
    constructor(x, y, timestamp, height) {
        super(x, y);
        this.timestamp = timestamp;
        this.height = height;
    }
    toString() {
        return `Observation at ${this.timestamp}, at location: (${this.x, this.y}), at the height of ${this.height}`;
    }
}
class Trek extends Trail {
    add(observation) {
        super.add(observation);
        return this;
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
const obs1 = new Observation(0, 0, new Date(), 200);
const obs2 = new Observation(1, 1, new Date(), 100);
console.log(obs1.toString());
console.log(obs2.toString());
console.log(obs1.distanceTo(obs2));
trail.add(obs1);
trail.add(obs2);
console.log(trail.totalDistance());
const trek = new Trek();
trek.add(obs1);
trek.add(obs2);
console.log(trek.totalDistance());
