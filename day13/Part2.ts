import {readFileSync} from 'fs';

const drawMap = (map:number[][]) => {
    const toPrint = new Array<Array<string>>()
    for (let i = 0; i < map.length; i++) {
        toPrint.push(Array.apply(null, new Array(map.length)).map(()=> '.'))
    }
    map.forEach(([x,y]) => toPrint[x][y] = '#')
    const formatted = toPrint.map(item => item.join('')).join('\n')
    console.log(formatted)
}


const input = readFileSync('./input.txt', 'utf-8').toString().split("\n\n")
let map = input[0].split('\n').map((item) => item.split(',').map(Number))
const folds = input[1].split('\n').map((item) => item.replace("fold along ", "").split('='))//.map(([coord,value]) => [ccord, Number(value)]))


for (const foldInstruction of folds) {
    const dots = new Set<string>()
    const foldAxis = foldInstruction[0]
    const foldValue = Number(foldInstruction[1])
    map.forEach(([x, y]) => {
        if (foldAxis == 'x') {
            if (x > foldValue) {
                const newValue = x % foldValue == 0 ? 0 : (foldValue - (x % foldValue))
                dots.add(newValue + ';' + y)
            } else {
                dots.add(x + ';' + y)
            }
        } else {
            if (y > foldValue) {
                const newValue = y % foldValue == 0 ? 0 : (foldValue - (y % foldValue))
                dots.add(x + ';' + newValue)
            } else {
                dots.add(x + ';' + y)
            }
        }
    })

    map = Array.from(dots.values()).map(item => item.split(';').map(Number))
}

drawMap(map)