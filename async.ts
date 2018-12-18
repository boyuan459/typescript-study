//async
import * as fs from 'fs';

function stringFromFile(filename: string): string {
    try {
        const data = fs.readFileSync(filename);
        return data.toString("UTF8");
    } catch (error) {
        console.log(error);
        return "";
    }
}

function stringFromFileAsync(filename: string, callback: (data: string) => void) {
    fs.readFile(filename, (error, data) => {
        if (error) {

        }
        let content = data.toString("UTF8");
        callback(content);
    })
}

function stringFromFileAsyncPromise(filename: string) : Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (error, data) => {
            if (error) {
                reject(error);
            }
            let content = data.toString("UTF8");
            resolve(content);
        });
    });
}

async function printFile(filename: string) {
    let data = await stringFromFileAsyncPromise(filename);
    console.log(data);
}
console.log(stringFromFile("tsconfig.json"));
stringFromFileAsyncPromise("tsconfig.json")
.then(data => {
    console.log(data);
})

printFile("tsconfig.json");