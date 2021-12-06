import {readFileSync} from 'fs';

let input = readFileSync('./input.txt', 'utf-8').toString().split(",").map(Number)

for (let i = 0; i < 80; i++) {
    const nextGen: Array<number> = []
    input = input.map(item => {
        if (item == 0) {
            nextGen.push(8)
            return 6
        } else {
            return item - 1
        }
    }).concat(nextGen)
}

console.log(input.length)

