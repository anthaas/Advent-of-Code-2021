import {readFileSync} from 'fs';

const input = readFileSync('./input.txt', 'utf-8').toString().split("\n").map(item => item.replace(" -> ", ",").split(",").map(Number))
let diagram = new Map<string, number>()

function writeCoords(key: string) {
    const value = diagram.has(key) ? Number(diagram.get(key)) + 1 : 1
    diagram.set(key, value)
}

function drawLine(item: Array<number>) {
    const [x1, y1, x2, y2] = item
    const eqX = x1 == x2
    const directionX = eqX ? 0 : x1 < x2 ? 1 : -1
    const directionY = eqX ? y1 < y2 ? 1 : -1 : 0
    const steps = eqX ? Math.abs(y1 - y2) : Math.abs(x1 - x2)
    for (let i = 0; i <= steps; i++) {
        const key = (x1 + i * directionX) + ',' + (y1 + i * directionY)
        writeCoords(key)
    }
}

const verticalOrHorizontal = input.filter(item => ((item[0] == item[2]) || (item[1] == item[3])))
verticalOrHorizontal.forEach(drawLine)

const result = Array.from(diagram.values()).filter(item => item > 1).length
console.log(result)

