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
       
        // @ts-ignore
        // if (this.collider) {
        //     ctx.save()
        //     ctx.strokeStyle = "red"
        //     ctx.lineWidth = 2
        //     ctx.strokeRect(
        //         Math.round(this.position.x + this.collider.offset.x), 
        //         Math.round(this.position.y + this.collider.offset.y), 
        //         this.collider.width,
        //         this.collider.height
        //         )
        //     ctx.restore()
        // }
    }

    update() {}
}