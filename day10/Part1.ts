import {readFileSync} from 'fs';

const input = readFileSync('./input.txt', 'utf-8').toString().split("\n").map((item) => item.split(''))

const EVALUATION_MAP = new Map<string, number>([[')', 3], [']', 57], ['}', 1197], ['>', 25137]])
const PAIRS = new Map<string, string>([['(', ')'], ['[', ']'], ['{', '}'], ['<', '>']])

function evaluateError(line: string[]): number {
    let stack = new Array<string>()
    let evaluation = 0
    for (const symbol of line) {
        if (['(', '[', '{', '<'].includes(symbol)) {
            stack = [symbol].concat(stack)
        } else {
            if (stack.length == 0) {
                console.log("Empty stack found " + symbol)
                return Number(EVALUATION_MAP.get(symbol))
            }

            if (symbol == PAIRS.get(stack[0])) {
                stack = stack.slice(1)
            } else {
                console.log("On stack " + stack[0] + " found " + symbol)
                return Number(EVALUATION_MAP.get(symbol))
            }
        }
    }
    return evaluation
}

const result = input.map(evaluateError).reduce((sum, current) => sum + current, 0)


console.log(result)