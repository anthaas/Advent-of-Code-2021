import {readFileSync} from 'fs';

const input = readFileSync('./input.txt', 'utf-8').toString().split("\n").map((item) => [100].concat(item.split('').map(Number)).concat([100]));
const row: number[] = new Array(input[0].length).fill(100);
input.unshift(row)
const borderedInput = input.concat([row])

let iter = 0;
for (let i = 1; i < borderedInput.length - 1; i++) {
    for (let j = 1; j < borderedInput[0].length - 1; j++) {
        const [l, r, u, d, n] = [borderedInput[i][j - 1], borderedInput[i][j + 1], borderedInput[i - 1][j], borderedInput[i + 1][j], borderedInput[i][j]]
        if (n < l && n < r && n < u && n < d) {
            iter += (n + 1)
        }
    }
}

console.log(iter)