import {readFileSync} from 'fs';

const input = readFileSync('./input.txt', 'utf-8').toString().split("\n").map(item => item.split(" | ").map(item => item.split(" ")))
//1 = 2 segments
//7 = 3 segments
//4 = 4 segments
//8 = 7 segments
const result = input
    .map(item => item[1]
        .map(outputValues => new Set(outputValues
            .split('')).size))
    .map(item => item
        .filter(elem => [2, 3, 4, 7].includes(elem)))
    .filter(elem => elem.length)
    .map(item => item.length)
    .reduce((sum, current) => sum + current, 0)

console.log(result)

