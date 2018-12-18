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

    constructor(protected x: number, protected y: number) {
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

class Trail {
    private _coordinates : Point[]
    constructor() {
        this._coordinates = [];
    }
    get coordinates() : Point[] {
        return this._coordinates;
    }
    set coordinates(coordinates: Point[]) {
        this._coordinates = coordinates;
    }
    add(point : Point) : Trail {
        this._coordinates.push(point);
        return this;
    }
    totalDistance() : number {
        let total = 0;
        for(let index = 1; index < this._coordinates.length; index++) {
            total += this._coordinates[index].distanceTo(this._coordinates[index-1]);
        }
        return total;
    }
}

class Observation extends Point {
    constructor(x:number, y:number, private timestamp: Date, private height: number) {
        super(x, y);
    }

    toString() {
        return `Observation at ${this.timestamp}, at location: (${this.x, this.y}), at the height of ${this.height}`;
    }
}

class Trek extends Trail {
    add(observation: Observation) : Trail {
        super.add(observation);
        return this;
    }
}

const homePos = new Point(0,0);
console.log(Point.origin.toString());
console.log(homePos.distanceTo(new Point(0,1)));

let trail = new Trail();
trail.add(homePos);
trail.add(new Point(0,1));
trail.add(new Point(1,1));
// console.log(trail.coordinates);
console.log(trail.totalDistance());

trail.coordinates = [];
console.log(trail.coordinates);

const obs1 = new Observation(0, 0, new Date(), 200);
const obs2 = new Observation(1,1,new Date(),100);
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
