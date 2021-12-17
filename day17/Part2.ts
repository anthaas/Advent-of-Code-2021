const [xFrom, xTo, yFrom, yTo] = [150, 193, -136, -86]

const unique = new Set<string>()

function calculateMaxYPosition(xVelocity: number, yVelocity: number) {
    let [x, y] = [0, 0]
    const entry = xVelocity + ';' + yVelocity

    for (let i = 0; i < 10000; i++) {
        x += xVelocity
        y += yVelocity

        if (xVelocity != 0) {
            xVelocity += xVelocity > 0 ? -1 : 1
        }
        yVelocity += -1

        if (xFrom <= x && x <= xTo && yFrom <= y && y <= yTo) {
            unique.add(entry)
            return
        }
    }

}

for (let i = 0; i < 200; i++) {
    for (let j = -200; j < 200; j++) {
        calculateMaxYPosition(i, j)
    }
}

console.log(unique.size)

