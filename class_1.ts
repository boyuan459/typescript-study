//class

// interface Point {
//     x : number
//     y : number
//     distanceTo(otherPoint : Point) : number
// }

// const homePos : Point = {
//     x: 0,
//     y: 0,
//     distanceTo(otherPoint) {
//         return Math.sqrt(Math.pow(otherPoint.x, 2) + Math.pow(otherPoint.y, 2));
//     }
// }

// function newPoint(x : number, y : number) : Point {
//     return {
//         x: x,
//         y: y,
//         distanceTo(otherPoint: Point) {
//             return Math.sqrt(Math.pow(otherPoint.x - x, 2) + Math.pow(otherPoint.y - y, 2));
//         }
//     };
// }

interface Printable {
    toString() : string
}

class Point implements Printable {
    static origin = new Point(0,0);

    // x : number
    // y : number

    constructor(public x: number, public y: number) {
        // this.x = x;
        // this.y = y;
    }

    distanceTo(otherPoint: Point) {
        return Math.sqrt(Math.pow(otherPoint.x - this.x, 2) + Math.pow(otherPoint.y - this.y, 2));
    }

    toString() {
        return `Point (${this.x}, ${this.y})`;
    }
}

interface Trail {
    coordinates : Point[]
    add(point : Point) : Trail
    totalDistance() : number
}

const homePos = new Point(0,0);
console.log(Point.origin.toString());
console.log(homePos.distanceTo(new Point(0,1)));
