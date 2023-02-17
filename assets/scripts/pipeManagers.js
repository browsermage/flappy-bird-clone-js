import { assets } from "@core";
import { Pipe } from "@scripts/pipe.js";
import { time } from "@scripts/time.js";
import { randomBetween } from "@scripts/math.js";

export class PipeManager {

    pipes = []
    moveSpeed = 60
    spawnTimer = 0
    score = false

    start() {
        this.createPipe()
    }

    update() {
        
        const timeBetweenSpawns = 2.5

        this.spawnTimer += time.deltaTime

        if (this.spawnTimer > timeBetweenSpawns) {
            
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
        // draw all pipes
        this.pipes.forEach(pipePair => {
            pipePair.pipeTop.draw()
            pipePair.pipeBottom.draw()
        })
    }

    createPipe() {
        const pipeTop = new Pipe(assets.get("pipe-top"))
        const pipeBottom = new Pipe(assets.get("pipe-bottom"))

        const areaBetweenPipes = randomBetween(60, 220)

        // calculate pipe positionen
        pipeTop.position.addPosition(300, areaBetweenPipes - pipeTop.sprite.height)
        pipeBottom.position.addPosition(300, areaBetweenPipes + 150)

        this.pipes.push({
            pipeTop,
            pipeBottom
        })
    }
}