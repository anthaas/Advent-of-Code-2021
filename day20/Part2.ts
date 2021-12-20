import {readFileSync} from 'fs'

const input = readFileSync('./input.txt', 'utf-8').toString().split('\n\n')
const algorithm = input[0]
const map = input[1].split('\n').map(item => item.split(''))

const expandMap = (map: string[][]): string[][] => {
    const result = new Array<Array<string>>()
    //top fill
    for (let i = 0; i < 5; i++) {
        result.push(new Array(map[0].length + 10).fill('.'))
    }
    //side fill
    for (const row of map) {
        result.push(['.', '.', '.', '.', '.'].concat(row).concat(['.', '.', '.', '.', '.']))
    }
    //bottom fill
    for (let i = 0; i < 5; i++) {
        result.push(new Array(map[0].length + 10).fill('.'))
    }
    return result
}

let enhanced = expandMap(map)
for (let i = 0; i < 50; i++) {
    const result = new Array<Array<string>>()
    for (let row = 1; row < enhanced.length - 1; row++) {
        const rowResult = new Array<string>()
        for (let col = 1; col < enhanced[0].length - 1; col++) {
            const val = [enhanced[row - 1][col - 1], enhanced[row - 1][col], enhanced[row - 1][col + 1], enhanced[row][col - 1], enhanced[row][col], enhanced[row][col + 1], enhanced[row + 1][col - 1], enhanced[row + 1][col], enhanced[row + 1][col + 1]]
                .map(item => item == '#' ? '1' : '0').join('')
            const algIndex = parseInt(val, 2)
            rowResult.push(algorithm[algIndex])
        }
        result.push(rowResult)
    }
    enhanced = i % 2 != 0 ? expandMap(result) : result

}

const litPixels = enhanced.map(item => item.filter(item => item == '#').length).reduce((acc, v) => acc + v)
console.log(litPixels)