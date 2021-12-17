import {readFileSync} from 'fs'

let data = readFileSync('./input.txt', 'utf-8').toString().split('').map(item => parseInt(item, 16).toString(2).padStart(4, '0')).join('').split('')

let result = 0
while (data.length != 0 && data.join('').includes('1')) {
    const header = data.slice(0, 6)
    data = data.slice(6)
    const version = parseInt(header.slice(0, 3).join(''), 2)
    result += version
    const typeId = parseInt(header.slice(3, 6).join(''), 2)
    if (typeId == 4) {
        let value = ""
        while (data[0] == '1') {
            value += data.slice(1, 5).join('')
            data = data.slice(5)
        }
        value += data.slice(1, 5).join('')
        data = data.slice(5)
        const decValue = parseInt(value, 2)
        //nothing to do here - version is already added
    } else {
        const lengthTypeId = parseInt(data[0], 2)
        data = data.slice(1)
        if (lengthTypeId == 0) {
            const subPacketLength = parseInt(data.slice(0, 15).join(''), 2)
            data = data.slice(15)
            //nothing to do here - version is already added, sub-pcaket will be processed in the next iteration
        } else {
            const numberOfPackets = parseInt(data.slice(0, 11).join(''), 2)
            data = data.slice(11)
            //nothing to do here - version is already added, sub-pcaket will be processed in the next iteration
        }
    }
}
console.log(result)
