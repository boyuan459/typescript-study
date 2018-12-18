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
const homePos = new Point(0, 0);
console.log(Point.origin.toString());
console.log(homePos.distanceTo(new Point(0, 1)));
