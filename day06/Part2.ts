import {readFileSync} from 'fs';

let input = readFileSync('./input.txt', 'utf-8').toString().split(",").map(Number)
let fishAges = initMap()
input.forEach(item => fishAges.set(item, Number(fishAges.get(item)) + 1))


for (let i = 0; i < 256; i++) {
    const nextGen = initMap()
    for (let j = 8; j >= 0; j--) {
        if (j == 0) {
            nextGen.set(8, Number(fishAges.get(0)))
            nextGen.set(6, Number(nextGen.get(6)) + Number(fishAges.get(0)))
        } else {
            nextGen.set(j - 1, Number(nextGen.get(j - 1)) + Number(fishAges.get(j)))
        }
    }
    fishAges = nextGen
}

function initMap() {
    const newMap = new Map<number, number>()
    for (let i = 0; i <= 8; i++) {
        newMap.set(i, 0)
    }
    return newMap
}

const result = Array.from(fishAges.values()).reduce((sum, current) => sum + current, 0)
console.log(result)

