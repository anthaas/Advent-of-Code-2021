import {readFileSync} from 'fs';

const input = readFileSync('./input.txt', 'utf-8').toString().split("\n").map((item) => parseInt(item));
const increasedCount = input.filter((e, i) => e < input.slice(1)[i]).length;
console.log(increasedCount);
