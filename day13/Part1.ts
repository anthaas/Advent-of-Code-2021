import {readFileSync} from 'fs';

const input = readFileSync('./input.txt', 'utf-8').toString().split("\n\n")
const map = input[0].split('\n').map((item) => item.split(',').map(Number))
const folds = input[1].split('\n').map((item) => item.replace("fold along ", "").split('='))//.map(([coord,value]) => [ccord, Number(value)]))

const foldInstruction = folds[0]
const dots = new Set<string>()


const foldAxis = foldInstruction[0]
const foldValue = Number(foldInstruction[1])

map.forEach(([x, y]) => {
    if (foldAxis == 'x') {
        if (x > foldValue) {
            const newValue = x%foldValue == 0 ? 0 : (foldValue - (x % foldValue))
            dots.add(newValue + ';' + y)
        } else {
            dots.add(x + ';' + y)
        }
    } else {
        if (y > foldValue) {
            const newValue = y%foldValue == 0 ? 0 : (foldValue - (y % foldValue))
            dots.add(x + ';' + newValue)
        } else {
            dots.add(x + ';' + y)
        }
    }
})

console.log(dots.size)