//enumeration
enum Rating {
    poor = 1,
    fair,
    average,
    good,
    excellent
}

console.log(Rating[4]);

interface Rated {
    rating: Rating
}

function averageRating(items: Rated[]) : number {
    let total = 0;
    for(let item of items) {
        total += item.rating;
    }
    return total/items.length;
}

const items = [{rating: Rating.poor}, {rating: Rating.good}];

console.log(averageRating(items));

enum DietaryInfo {
    glutenFree = 'gluten-free',
    dairyFree = 'dairy-free',
    vegetarian = 'vegetarian',
    vegan = 'vegan'
}

// console.log(DietaryInfo['dairy-free'])
console.log(DietaryInfo['dairyFree']);