import { Vector2 } from "@scripts/math.js"
import { ctx } from "@core"


export class GameObject {
    position = new Vector2(0,0)
    sprite

    constructor(sprite) {
        this.sprite = {
            texture: sprite,
            flipped: false
        }
    }

    draw() {
        ctx.drawImage(this.sprite.texture, Math.round(this.position.x), Math.round(this.position.y))
    }

    update() {}
}