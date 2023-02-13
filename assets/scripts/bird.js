import { GameObject } from "@scripts/gameObject.js"
import { Vector2 } from "@scripts/math.js"
import { input } from "@scripts/input.js"
import { time } from "@scripts/time.js"

export class Bird extends GameObject {
    jumpForce = -3
    velocity = new Vector2(0,0)

    update() {

        if (input.getKeyPressed("KeyW")) {
            this.velocity.y = this.jumpForce
        } 

        const gravity = 8

        this.velocity.y = this.velocity.y + gravity * time.deltaTime
        this.position.addPosition(this.velocity.x, this.velocity.y)
    }

    // Axis-aligned bounding box testing (AABB collision test)
    collides(pipe) {
        return pipe.position.x < this.position.x + this.sprite.width &&
        pipe.position.x + pipe.sprite.width > this.position.x &&
        pipe.position.y < this.position.y + this.sprite.height &&
        pipe.sprite.height + pipe.position.y > this.position.y
    }
}
