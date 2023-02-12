import { Vector2 } from "@scripts/math.js"
import { ctx } from "@core"


export class GameObject {
    position = new Vector2(0,0)
    sprite

    constructor(sprite) {
        this.sprite = sprite
    }

    draw() {
        ctx.drawImage(this.sprite, Math.round(this.position.x), Math.round(this.position.y))
    }

    update() {}
}