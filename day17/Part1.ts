const [xFrom, xTo, yFrom, yTo] = [150, 193, -136, -86]

function calculateMaxYPosition(xVelocity: number, yVelocity: number): number {
    let [x, y] = [0, 0]
    let yMax = 0
    for (let i = 0; i < 10000; i++) {
        x += xVelocity
        y += yVelocity
        yMax = Math.max(yMax, y)
        if (xVelocity != 0) {
            xVelocity += xVelocity > 0 ? -1 : 1
        }
        yVelocity += -1

        if (xFrom <= x && x <= xTo && yFrom <= y && y <= yTo) {
            return yMax
        }
    }

    return 0
}

const maxes = new Array<number>()

for (let i = 0; i < 200; i++) {
    for (let j = -200; j < 200; j++) {
        const result = calculateMaxYPosition(i, j)
        if (result > 0) {
            maxes.push(result)
        }
    }
}

console.log(Math.max(...maxes))

