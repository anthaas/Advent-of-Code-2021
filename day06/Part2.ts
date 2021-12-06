import {readFileSync} from 'fs';

let input = readFileSync('./input.txt', 'utf-8').toString().split(",").map(Number)
let fishAges = [0, 0, 0, 0, 0, 0, 0, 0, 0]
input.forEach(item => fishAges[item] = fishAges[item] + 1)

for (let i = 0; i < 256; i++) {
    const nextGen = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let index = 8; index >= 0; index--) {
        if (index == 0) {
            nextGen[8] = fishAges[0]
            nextGen[6] = fishAges[0] + nextGen[6]
        } else {
            nextGen[index - 1] = fishAges[index] + nextGen[index - 1]
        }
    }
    fishAges = nextGen
}

const result = fishAges.reduce((sum, current) => sum + current, 0)
console.log(result)

