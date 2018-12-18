//advanced type
const list = [-1,3,7];

function isPositive(n: number) : boolean {
    return n > 0;
}

console.log(list.every(isPositive));

console.log(list.some(value => value > 0));

let newList = list.map(item => item + 1);
console.log(newList);

let total = list.reduce((prev, curr) => prev + curr);
console.log(total);

let authors: Set<string> = new Set(["John", "Barry"]);
console.log(authors);

let airports: Map<string, string> = new Map([['LAX', 'Los Angel'], ['PEK', 'Beijing']]);
airports.set("DXB", "Dubai");
console.log(airports.get('PEK'));

class Paypal {
    constructor(private email: string) {}
}

class CreditCard {
    constructor(private cardNumber: number) {}
}

type PaymentMethod = Paypal | CreditCard;

function initPayment(amount: number, pay: PaymentMethod) {
    if (pay instanceof Paypal) {
        console.log('Paypal');
    } else if (pay instanceof CreditCard) {
        console.log("Credit card");
    }
}

let pay = new Paypal("");
initPayment(100, pay);

type Weekday = "Monday" | "Tuesday" | "Wednesday";

let weekday : Weekday = 'Monday';

interface Publication {
    author: string
    title: string
    year: number
}

type ReadonlyPublication = Readonly<Publication>

type Readonly2<T> = {
    readonly [K in keyof T] : T[K]
}

type ReadonlyPublication2 = Readonly2<Publication>
const data : Publication = {author: 'by', title: 'test', year: 2018};
data.year = 9000;