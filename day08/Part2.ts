import {readFileSync} from 'fs';

const input = readFileSync('./input.txt', 'utf-8').toString().split("\n").map(item => item.split(" | ").map(item => item.split(" ")))

function decodeLine(signals: string[], outputs: string[]) {
    const decodedData = new Array<Array<String>>(9);
    const oneLine = signals.map(item => new Set(item.split(''))).sort((a, b) => a.size - b.size)
    const digits = outputs.map(item => Array.from(new Set(item.split(''))).sort().join(''))

    oneLine.forEach((item) => {
        //1 = 2 segments
        //7 = 3 segments
        //4 = 4 segments
        //8 = 7 segments
        if (item.size == 2) {
            decodedData[1] = Array.from(item).sort()
        } else if (item.size == 3) {
            decodedData[7] = Array.from(item).sort()
        } else if (item.size == 4) {
            decodedData[4] = Array.from(item).sort()
        } else if (item.size == 7) {
            decodedData[8] = Array.from(item).sort()
        } else if (item.size == 5) {
            // 2, 3 or 5
            const currentElement = Array.from(item).sort()
            //segments in 4 but not in 1
            const fourMinusOne = decodedData[4].filter(x => !decodedData[1].includes(x))

            //5 = segments for fourMinusOne fully covered
            if (currentElement.filter(x => fourMinusOne.includes(x)).length == 2) {
                decodedData[5] = currentElement
            } else
                //3 = segments for 1 fully covered
            if (currentElement.filter(x => decodedData[1].includes(x)).length == 2) {
                decodedData[3] = currentElement
            } else
                //2 = segments for fourMinusOne covered only by one segment
            if (currentElement.filter(x => fourMinusOne.includes(x)).length == 1) {
                decodedData[2] = currentElement
            }
        } else if (item.size == 6) {
            // 0 6 or 9
            const currentElement = Array.from(item).sort()
            //segments in 4 but not in 1
            const fourMinusOne = decodedData[4].filter(x => !decodedData[1].includes(x))
            //6 = 1 segment common with 1 and 3 segments common with 4
            if (currentElement.filter(x => decodedData[1].includes(x)).length == 1 &&
                currentElement.filter(x => decodedData[4].includes(x)).length == 3) {
                decodedData[6] = currentElement
            } else
                //9 = segments for fourMinusOne fully covered
            if (currentElement.filter(x => fourMinusOne.includes(x)).length == 2) {
                decodedData[9] = currentElement
            } else {
                //default for 0
                decodedData[0] = currentElement
            }
        }
    })

    return Number(digits.map(digit => decodedData.map(item => item.join('')).indexOf(digit)).join(''))

}


const result = input.map(item => decodeLine(item[0], item[1])).reduce((sum, current) => sum + current, 0)
console.log(result)

