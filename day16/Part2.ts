import {readFileSync} from 'fs'

class Packet {
    version: number
    typeId: number
    literal: number
    subpackets: Packet[]
    remaining: string[]

    constructor(version: number, typeId: number, literal: number, subpackets: Packet[], remaining: string[]) {
        this.version = version
        this.typeId = typeId
        this.literal = literal
        this.subpackets = subpackets
        this.remaining = remaining
    }
}

function parsePacket(data: string[]): Packet {
    const header = data.slice(0, 6)
    data = data.slice(6)
    const version = parseInt(header.slice(0, 3).join(''), 2)
    const typeId = parseInt(header.slice(3, 6).join(''), 2)
    if (typeId == 4) {
        let value = ""
        while (data[0] == '1') {
            value += data.slice(1, 5).join('')
            data = data.slice(5)
        }
        value += data.slice(1, 5).join('')
        data = data.slice(5)
        const literal = parseInt(value, 2)
        return new Packet(version, typeId, literal, new Array<Packet>(), data)
    } else {
        const lengthTypeId = parseInt(data[0], 2)
        data = data.slice(1)
        if (lengthTypeId == 0) {
            const subPackets = new Array<Packet>();
            const subPacketLength = parseInt(data.slice(0, 15).join(''), 2)
            data = data.slice(15)
            const originalLength = data.length
            while ((originalLength - data.length) < subPacketLength) {
                const subPacket = parsePacket(data)
                subPackets.push(subPacket)
                data = subPacket.remaining
            }
            return new Packet(version, typeId, NaN, subPackets, data)
        } else {
            const subPackets = new Array<Packet>();
            const numberOfPackets = parseInt(data.slice(0, 11).join(''), 2)
            data = data.slice(11)
            for (let i = 0; i < numberOfPackets; i++) {
                const subPacket = parsePacket(data)
                subPackets.push(subPacket)
                data = subPacket.remaining
            }
            return new Packet(version, typeId, NaN, subPackets, data)
        }
    }
}

function evaluate(packet: Packet): number {
    const typeId = packet.typeId
    switch (typeId) {
        case 0 :
            return packet.subpackets.map(item => evaluate(item)).reduce((a, b) => a + b)
        case 1 :
            return packet.subpackets.map(item => evaluate(item)).reduce((a, b) => a * b)
        case 2 :
            return Math.min(...packet.subpackets.map(item => evaluate(item)))
        case 3 :
            return Math.max(...packet.subpackets.map(item => evaluate(item)))
        case 4 :
            return packet.literal
        case 5 :
            return evaluate(packet.subpackets[0]) > evaluate(packet.subpackets[1]) ? 1 : 0
        case 6 :
            return evaluate(packet.subpackets[0]) < evaluate(packet.subpackets[1]) ? 1 : 0
        case 7 :
            return evaluate(packet.subpackets[0]) == evaluate(packet.subpackets[1]) ? 1 : 0
    }
    return NaN
}


const data = readFileSync('./input.txt', 'utf-8').toString().split('').map(item => parseInt(item, 16).toString(2).padStart(4, '0')).join('').split('')
console.log(evaluate(parsePacket(data)))


