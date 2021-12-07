import {readFileSync} from 'fs';

let input = readFileSync('./input.txt', 'utf-8').toString().split(",").map(Number)
let row = Array.from(Array(Math.max(...input)).keys())

function sumToN(n: number) {
    return (1 + n) / 2 * n
}

const costs = row
    .map(elem => input
        .map(item => sumToN(Math.abs(item - elem)))
        .reduce((sum, current) => sum + current, 0))
const result = Math.min(...costs)

console.log(result)


