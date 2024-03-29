import {readFileSync} from 'fs';

const input = readFileSync('./input.txt', 'utf-8').toString().split("\n").map((item) => parseInt(item));
const sums = input.map((e, i) => e + input.slice(1)[i] + input.slice(2)[i]);
const increasedCount = sums.filter((e, i) => e < sums.slice(1)[i]).length;
console.log(increasedCount);
