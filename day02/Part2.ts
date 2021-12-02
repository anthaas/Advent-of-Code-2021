import {readFileSync} from 'fs';

const input = readFileSync('./input.txt', 'utf-8').toString().split("\n").map((item) => item.split(" "));

let position = 0;
let depth = 0;
let aim = 0;
input.map(item => {
    const instruction = item[0];
    const amount = parseInt(item[1]);
    switch (instruction) {
        case "forward" :
            position += amount;
            depth += amount * aim;
            break;
        case "down" :
            aim += amount;
            break;
        case "up" :
            aim -= amount;
            break;
        default :
            console.log("unknown instruction " + instruction);
    }
});

console.log(position * depth);
