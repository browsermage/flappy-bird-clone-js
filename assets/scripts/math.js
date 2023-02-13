export class Vector2 {
    x = 0 
    y = 0 
    
    addPosition(x, y) {
        this.x += x
        this.y += y
    }

    constructor(x, y) {
        this.addPosition(x,y)
    }
}

/**
 * Returns a pseudorandom number within [min, max] (both inclusive).
 */
export function randomBetween(minInclusive = 0, maxInclusive = 1) {
    return Math.floor(Math.random() * (maxInclusive - minInclusive + 1) + minInclusive)
}