import {readFileSync} from 'fs';

const input = readFileSync('./input.txt', 'utf-8').toString().split("\n").map((item) => parseInt(item));
const increasedCount = input.map((e, i) => e < input.slice(1)[i]).filter(Boolean).length;
console.log(increasedCount);
