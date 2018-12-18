//type assertion
class Point {
    constructor(public x:number, public y: number){}
    add(otherPoint : Point) : Point {
        this.x += otherPoint.x;
        this.y += otherPoint.y;
        return this;
    }
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

let p_inline = { x: 2, y: 3};
p = p_inline as Point;

// console.log(p.add(new Point(1,1)));
function print(point : Point) {
    if (point instanceof Point3d) {
        console.log(`Point (${point.x}, ${point.y}, ${point.z})`);
    } else if (point instanceof Point) {
        console.log(`Point (${point.x}, ${point.y})`);
    }
}

print(q);