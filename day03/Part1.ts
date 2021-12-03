import {readFileSync} from 'fs';

const inputAsMatrix = readFileSync('./input.txt', 'utf-8').toString().split("\n").map(item =>item.split(''))
const transposedMatrix = inputAsMatrix[0].map((_, colIndex) => inputAsMatrix.map(row => row[colIndex]));
const generatedBinaryNumber = transposedMatrix.map(item => item.filter(ch => ch === '1').length > item.length / 2 ? "1" : "0").join("");
const flippedBits = generatedBinaryNumber.split('').map(ch => ch === '1' ? '0' : '1').join("");
const gammaRate = parseInt(generatedBinaryNumber, 2);
const epsilonRate = parseInt(flippedBits, 2);
console.log(gammaRate * epsilonRate);
