import "reflect-metadata";

//decorator

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

enum TrailPrivilege {
    readCoordinates,
    writeCoordinates,
    addPoints,
    getDistance
}

interface User {
    userID: string
    privileges: Set<TrailPrivilege>
}

const currentUser = {
    userID: 'TK123',
    privileges: new Set([TrailPrivilege.readCoordinates, TrailPrivilege.addPoints, TrailPrivilege.getDistance])
};

function methodRequiresPermission(privilege: TrailPrivilege) {
    return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) : PropertyDescriptor {
        const originalValue = descriptor.value;
        descriptor.value = function(...args: any[]) {
            if (currentUser.privileges.has(privilege)) {
                return originalValue.apply(this, args);
            } else {
                console.log("You are not authorized for this action");
            }
        }
        return descriptor;
    }
}

function accessorRequiresPermission(readPrivilege: TrailPrivilege.readCoordinates, writePrivilege: TrailPrivilege.writeCoordinates) {
    return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) : PropertyDescriptor{
        if (!currentUser.privileges.has(readPrivilege)) {
            descriptor.get = () => console.log(`No permission to read property ${propertyKey}`);
        }
        if (!currentUser.privileges.has(writePrivilege)) {
            descriptor.set = () => console.log(`No permission to write property ${propertyKey}`);
        }
        return descriptor;
    }
}

// function logProperty(target: Object, propertyKey: string) {
//     let value = target[propertyKey];
//     Reflect.deleteProperty(target, propertyKey);
//     Reflect.defineProperty(target, propertyKey, {
//         get: function() {
//             console.log("Get value: " + value);
//             return value;
//         },
//         set: function(newValue) {
//             console.log("Set value: " + newValue);
//             value = newValue;
//         }
//     });
// }

type Constructor = new(...args: any[]) => any;

function logInstanceCreation(target: Constructor) : Constructor {
    class C extends target {
        constructor(...args: any[]) {
            console.log("New " + target.name + " instance created");
            super(...args);
        }
    }
    return C;
}

const logParamsMeta = "logParamsMeta";

function logParam(target: Object, propertyKey: string, index: number) {
    let logParams = Reflect.getMetadata(logParamsMeta, target) as Map<string, Set<number>>;
    if (!logParams) {
        logParams = new Map<string, Set<number>>();
    }
    if (!logParams.has(propertyKey)) {
        logParams.set(propertyKey, new Set([index]));
    } else {
        let indexSet = logParams.get(propertyKey) as Set<number>;
        indexSet.add(index);
        logParams.set(propertyKey, indexSet);
    }
    // target[logParamsMeta] = logParams;
    Reflect.defineMetadata(logParamsMeta, logParams, target);
    console.log(logParams);
}

function logMethodParams(target: Object, propertyKey: string, descriptor: PropertyDescriptor) : PropertyDescriptor {
    const indexSet = [...Reflect.getMetadata(logParamsMeta, target).get(propertyKey)];
    const originalValue = descriptor.value;
    descriptor.value = function(...args: any[]) {
        console.log("Input for method " + propertyKey + ":" + indexSet.map(index => args[index].toString()).join(", "));
        return originalValue.apply(this, args);

    }
    return descriptor;
}

@logInstanceCreation
class Trail {
    // @logProperty
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
