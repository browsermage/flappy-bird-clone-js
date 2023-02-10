import { assets } from "@core";
import { Pipe } from "@scripts/pipe.js";
import { time } from "@scripts/time.js";

export class PipeManager {

    pipes = []
    moveSpeed = 60
    spawnTimer = 0

    start() {
        this.createPipe()
    }

    update() {
        // pipe spawner
        this.spawnTimer += time.deltaTime

        if (this.spawnTimer > 2) {
            
            this.createPipe()

            this.spawnTimer = 0
        }

        // update all pipe positions
        this.pipes.forEach(pipe => pipe.position.x -= this.moveSpeed * time.deltaTime)
    }
    
    draw() {
        // draw all pipes
        this.pipes.forEach(pipe => pipe.draw())
    }

    createPipe() {
        const pipe = new Pipe(assets.get("pipe"))

        pipe.position.addPosition(300, 240)

        this.pipes.push(pipe)
    }
}