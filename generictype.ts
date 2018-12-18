// generic types
enum Country {
    US = 'United States',
    JP = 'Japan',
    CN = 'China',
    DE = 'Germany'
}

// interface Sales {
//     country: Country,
//     amount: number
// }

interface Comparable<T> {
    compareTo(item: T) : number
}

class Sales implements Comparable<Sales> {
    constructor(private country: Country, private amount: number) {

    }
    compareTo(sales: Sales) : number {
        if (this.amount > sales.amount) {
            return 1;
        } else {
            return -1;
        }
    }
}

// let sales : Sales[] = [{country: Country.US, amount: 35600}, {country: Country.CN, amount: 48900}, {country: Country.JP, amount: 34800}, {country: Country.DE, amount: 67000}];
let sales : Sales[] = [new Sales(Country.US, 345000), new Sales(Country.CN, 789000)];
// function findMax(sales : Sales[]) : Sales {
//     let max = sales[0];
//     for(let element of sales) {
//         if (element.amount > max.amount) {
//             max = element;
//         }
//     }
//     return max;
// }
// function findMax(data: any[]) : any {
//     let max = data[0];
//     for(let element of data) {
//         if (element.amount > max.amount) {
//             max = element;
//         }
//     }
//     return max;
// }

// interface HasAmount {
//     amount: number
// }
// function findMax<T extends HasAmount>(data: T[]) : T {
//     let max = data[0];
//     for(let element of data) {
//         if (element.amount > max.amount) {
//             max = element;
//         }
//     }
//     return max;
// }
// function findMax<T, K extends keyof T>(data: T[], key: K) : T {
//     let max = data[0];
//     for(let element of data) {
//         if (element[key] > max[key]) {
//             max = element;
//         }
//     }
//     return max;
// }
// function findMax<T extends Comparable<T>>(data: T[]) : T {
//     let max = data[0];
//     for(let element of data) {
//         if (element.compareTo(max)) {
//             max = element;
//         }
//     }
//     return max;
// }
// // console.log(findMax(sales, 'amount'));
// console.log(findMax(sales));

class OrderList<T extends Comparable<T>> {
    constructor(private data: T[]){}
    maxItem() : T {
        let max = this.data[0];
        for(let element of this.data) {
            if (element.compareTo(max)) {
                max = element;
            }
        }
        return max;
    }
}

const salesList = new OrderList<Sales>(sales);
console.log(salesList.maxItem());