//type assertion
class Point {
    constructor(public x:number, public y: number){}
}

class Point3d extends Point {
    constructor(x: number, y: number, public z: number) {
        super(x, y);
    }
}

let p: Point = new Point(0, 0);
let q: Point3d = new Point3d(1, 1, 9);

q  = p as Point3d
console.log(q);