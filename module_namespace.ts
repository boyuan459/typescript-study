import "reflect-metadata";
import {TrailPrivilege, logParam, logMethodParams, logInstanceCreation, methodRequiresPermission, accessorRequiresPermission} from './permission';
import { logProperty } from './logging/logProperty';

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

@logInstanceCreation
class Trail {
    @logProperty
    private _coordinates : Point[]
    constructor() {
        this._coordinates = [];
    }
    @accessorRequiresPermission(TrailPrivilege.readCoordinates, TrailPrivilege.writeCoordinates)
    get coordinates() : Point[] {
        return this._coordinates;
    }
    set coordinates(coordinates: Point[]) {
        this._coordinates = coordinates;
    }
    @logMethodParams
    @methodRequiresPermission(TrailPrivilege.addPoints)
    add(@logParam point : Point) : Trail {
        this._coordinates.push(point);
        return this;
    }
    @methodRequiresPermission(TrailPrivilege.getDistance)
    totalDistance() : number {
        let total = 0;
        for(let index = 1; index < this._coordinates.length; index++) {
            total += this._coordinates[index].distanceTo(this._coordinates[index-1]);
        }
        return total;
    }
}

const trail = new Trail();
trail.add(new Point(0,0));

console.log(trail.coordinates);
console.log(trail.totalDistance());
