import { GameObject } from "@scripts/gameObject.js"
import { time } from "@scripts/time.js"
import { ctx } from "@core"

export class PipePair extends GameObject {

    speed = 60

    update() {
        this.position.x -= this.speed * time.deltaTime
    }

    draw() {
        ctx.drawImage(this.sprite, Math.round(this.position.x), Math.round(this.position.y))

    }

}