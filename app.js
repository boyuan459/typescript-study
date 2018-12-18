"use strict";
//type assertion
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Point3d extends Point {
    constructor(x, y, z) {
        super(x, y);
        this.z = z;
    }
}
let p = new Point(0, 0);
let q = new Point3d(1, 1, 9);
