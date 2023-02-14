import { GameObject } from "@scripts/gameObject.js"
import { Vector2 } from "@scripts/math.js"
import { input } from "@scripts/input.js"
import { time } from "@scripts/time.js"
import { assets } from "@core"

export class Bird extends GameObject {
    jumpForce = -1.5
    velocity = new Vector2(0,0)
    dead = false

    update() {

        if (input.getKeyPressed("KeyF") && !this.dead) {
            this.velocity.y = this.jumpForce
        } 

        const gravity = 3

        this.velocity.y = this.velocity.y + gravity * time.deltaTime
        this.position.addPosition(this.velocity.x, this.velocity.y)

        if (this.dead) {
            this.sprite = assets.get("bird-hurt")
        } else {
            this.sprite = (this.velocity.y < 0) ? assets.get("bird-flap"): assets.get("bird")
        }
    }

    // Axis-aligned bounding box testing (AABB collision test)
    collides(pipe) {
        return pipe.position.x < this.position.x + this.sprite.width &&
        pipe.position.x + pipe.sprite.width > this.position.x &&
        pipe.position.y < this.position.y + this.sprite.height &&
        pipe.sprite.height + pipe.position.y > this.position.y
    }
}
