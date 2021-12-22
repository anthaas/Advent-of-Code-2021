import {readFileSync} from "fs";

const input = readFileSync('./input.txt', 'utf-8').toString().split('\n').map(item => item.split(' '))
const alive = new Set<string>()

input.forEach(item => {
    const instruction = item[0] == 'on' ? 1 : 0
    const ranges = item[1].split(',')
    const xRange = ranges[0].slice(2).split('..').map(Number)
    const yRange = ranges[1].slice(2).split('..').map(Number)
    const zRange = ranges[2].slice(2).split('..').map(Number)
    const inRange = xRange.concat(yRange).concat(zRange).filter(item => item <= 50 && item >= -50).length == 6
    if (inRange) {
        for (let x = xRange[0]; x <= xRange[1]; x++) {
            for (let y = yRange[0]; y <= yRange[1]; y++) {
                for (let z = zRange[0]; z <= zRange[1]; z++) {
                    if (instruction) {
                        alive.add(JSON.stringify([x, y, z]))
                    } else {
                        alive.delete(JSON.stringify([x, y, z]))
                    }
                }

            }
        }
    }
})

console.log(alive.size)