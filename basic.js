"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Hello, typescript");
console.log("Test typescript");
const loginAttemptLimit = 3;
let loginAttempts = 0;
let firstName = "Bo";
let greeting = `Awesome, typescript ${firstName}`;
// greeting = undefined;
let userIsOnline = true;
let primeNums = [2, 3, 5, 7, 11];
let lastPrime = primeNums.pop();
let userProfile = {
    id: 1234,
    firstName: "Bo",
    lastName: "Yuan"
};
let cUserProfile = [123, "Bo", "Yuan"];
console.log(greeting);
function greet(name, newMessagesFrom, welcomeText = "Enjoy") {
    welcomeText = welcomeText || "";
    let greeting = `Greeting ${name}! You have ${newMessagesFrom.length} new messages from ${list(...newMessagesFrom)} !`;
    greeting += `${welcomeText}`;
    return greeting;
}
function list(...items) {
    const lastItem = items.pop();
    return items.join(', ') + ' and ' + lastItem;
}
const newMessagesFrom = ["Michael", "Laura"];
console.log(greet("Bo", newMessagesFrom));
// console.log(list("A", "B"));
newMessagesFrom.push("Linda", "Bo");
console.log(newMessagesFrom);
let someNames = ["Bxxx", "Gxxx"];
let newArr1 = [newMessagesFrom, someNames];
console.log(newArr1);
let newArr2 = [...newMessagesFrom, ...someNames];
console.log(newArr2);
let [firstEle, ...others] = newArr2;
console.log(firstEle, others);
let list2 = list;
console.log(list2("AAA", "AA", "A"));
const sayHello = function () {
    console.log("Hello!");
};
const hungry = function () {
    console.log("I'm hungry!");
};
const sayGoodbye = function () {
    console.log("Bye bye!");
};
const tasks = [sayHello, hungry, sayGoodbye];
function simpleSchedule(delay) {
    return function () {
        let totalDelay = 0;
        for (let task of tasks) {
            setTimeout(task, totalDelay);
            totalDelay += delay;
        }
    };
}
const taskManager = {
    taskList: tasks,
    simpleSchedule: function (delay) {
        return () => {
            let totalDelay = 0;
            for (let task of this.taskList) {
                setTimeout(task, totalDelay);
                totalDelay += delay;
            }
        };
    }
};
const taskRunner = taskManager.simpleSchedule(2000);
taskRunner();
