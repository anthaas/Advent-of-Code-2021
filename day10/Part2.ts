import {readFileSync} from 'fs';

const input = readFileSync('./input.txt', 'utf-8').toString().split("\n").map((item) => item.split(''))

const PAIRS = new Map<string, string>([['(', ')'], ['[', ']'], ['{', '}'], ['<', '>']])
const EVALUATION_MAP = new Map<string, number>([['(', 1], ['[', 2], ['{', 3], ['<', 4]])

function process(line: string[]): Array<string> {
    let stack = new Array<string>()
    for (const symbol of line) {
        if (['(', '[', '{', '<'].includes(symbol)) {
            stack = [symbol].concat(stack)
        } else {
            if (stack.length == 0) {
                return []
            }
            if (symbol == PAIRS.get(stack[0])) {
                stack = stack.slice(1)
            } else {
                return []
            }
        }
    }
    return stack
}

function evaluateRemaining(line: string[]): number {
    let score = 0
    for (const symbol of line) {
        score = score * 5 + Number(EVALUATION_MAP.get(symbol))
    }
    return score
}


const results = input.map(process)
    .filter(item => item.length != 0)
    .map(evaluateRemaining)
    .sort((a, b) => a - b)
const result = results[Math.floor(results.length / 2)]
console.log(result)