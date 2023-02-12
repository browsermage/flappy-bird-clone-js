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
        this.pipes.forEach(pipePair => {
            pipePair.pipeTop.position.x -= this.moveSpeed * time.deltaTime
            pipePair.pipeBottom.position.x -= this.moveSpeed * time.deltaTime
        })
    }
    
    draw() {
        // vänd ena spriten

        // draw all pipes
        this.pipes.forEach(pipePair => {
            pipePair.pipeTop.draw()
            pipePair.pipeBottom.draw()
        })
    }

    createPipe() {
        const pipeTop = new Pipe(assets.get("pipe-top"))
        const pipeBottom = new Pipe(assets.get("pipe-bottom"))

        // calculate pipe positionen
        pipeTop.position.addPosition(300, -110)
        pipeBottom.position.addPosition(300, 240)

        this.pipes.push({
            pipeTop,
            pipeBottom
        })
    }
}