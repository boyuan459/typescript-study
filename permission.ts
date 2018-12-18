export enum TrailPrivilege {
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

export function methodRequiresPermission(privilege: TrailPrivilege) {
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

export function accessorRequiresPermission(readPrivilege: TrailPrivilege.readCoordinates, writePrivilege: TrailPrivilege.writeCoordinates) {
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

export function logInstanceCreation(target: Constructor) : Constructor {
    class C extends target {
        constructor(...args: any[]) {
            console.log("New " + target.name + " instance created");
            super(...args);
        }
    }
    return C;
}

const logParamsMeta = "logParamsMeta";

export function logParam(target: Object, propertyKey: string, index: number) {
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

export function logMethodParams(target: Object, propertyKey: string, descriptor: PropertyDescriptor) : PropertyDescriptor {
    const indexSet = [...Reflect.getMetadata(logParamsMeta, target).get(propertyKey)];
    const originalValue = descriptor.value;
    descriptor.value = function(...args: any[]) {
        console.log("Input for method " + propertyKey + ":" + indexSet.map(index => args[index].toString()).join(", "));
        return originalValue.apply(this, args);

    }
    return descriptor;
}
