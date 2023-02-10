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