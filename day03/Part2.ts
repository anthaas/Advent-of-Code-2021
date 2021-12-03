import {readFileSync} from 'fs';

const input = readFileSync('./input.txt', 'utf-8').toString().split("\n");

function filterByCriteria(input: string[], ifTrueChar: string, ifFalseChar: string): number {
    let i = 0;
    while (input.length != 1) {
        const filterBy = input.map(item => item[i]).filter(item => item === '1').length >= input.length / 2 ? ifTrueChar : ifFalseChar;
        input = input.filter(item => item[i] === filterBy);
        i++;
    }

    return parseInt(input[0], 2);
}

let oxygen = filterByCriteria(input, '1', '0');
let co2 = filterByCriteria(input, '0', '1');
console.log(oxygen * co2);