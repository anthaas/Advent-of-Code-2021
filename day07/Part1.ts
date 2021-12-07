import {readFileSync} from 'fs';

let input = readFileSync('./input.txt', 'utf-8').toString().split(",").map(Number)
let row = Array.from(Array(Math.max(...input)).keys())

const costs = row
    .map(elem => input
        .map(item => Math.abs(item - elem))
        .reduce((sum, current) => sum + current, 0))
const result = Math.min(...costs)

console.log(result)


