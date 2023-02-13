import { PipeManager } from "@scripts/pipeManagers.js"
import { GameObject } from "@scripts/gameObject.js"
import { input } from "@scripts/input.js"
import { time } from "@scripts/time.js"
import { Bird } from "@scripts/bird.js"

const canvas = document.createElement("canvas")
canvas.style.imageRendering = "pixelated"
const ctx = canvas.getContext("2d")

document.body.appendChild(canvas)

// 9:16
canvas.width = 288
canvas.height = 512

// set text 
ctx.font = "36px Retro"
ctx.textAlign = "left"

function strokedAndFilledText(text = "", x = 0, y = 0) {
    ctx.lineWidth = 12
    ctx.strokeStyle = "#eafddb";

    ctx.strokeText(text, x, y)
    ctx.lineWidth = 8

    ctx.strokeStyle = "#523747";
    ctx.strokeText(text, x, y)
    
    ctx.fillStyle = "#fff"
    ctx.fillText(text, x, y)
}


// fetch assets
const assets = new Map()

document.querySelectorAll("[data-asset]")
    .forEach(asset => assets.set(asset.getAttribute("data-asset"), asset))

// creating our gameObjects from the fetched assets
const bird = new Bird(assets.get("bird"))
const background = new GameObject(assets.get("background"))
const ground = new GameObject(assets.get("ground"))
const pipeManager = new PipeManager()

// setting up starting position
ground.position.addPosition(0, 400)
bird.position.addPosition(128, 240)

// running start on the PipeManager to create one pipe directly so we do no have to wait
pipeManager.start()

// define the games states
const states = {
    countdown: "Countdown",
    running: "Running",
    score: "Score",
    start: "Start"
}

// set starting state
let state = states.running

function animate(unscaledTime = 0) {

    // compute time elapsed since last frame a.k.a delta time
    time.deltaTime = Number(((unscaledTime - time.lastTime) / 1000))

    // deltaTime value is capped to maximumDeltaTime
    time.deltaTime = Math.min(time.deltaTime, time.maximumDeltaTime)

    // update the last time with the current time
    time.lastTime = unscaledTime

    // deltaTime is added to elapsed time so far
    time.elapsedTime += time.deltaTime

    // draw
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    background.draw()
    pipeManager.draw()


    if (state === states.running) {
        // update
        pipeManager.update()
        bird.update()

        // check collision on every pipe pair with the bird
        pipeManager.pipes.forEach(pipePair => {
            if (bird.collides(pipePair.pipeTop) || bird.collides(pipePair.pipeBottom)) {
                state = states.score
            } 
        })

        // check if we have a collsion with the ground
        if (bird.collides(ground)) {
            state = states.score
        }

        // if the bird goes offscreen
        if (bird.position.y < 0) {
            state = states.score
        }

        strokedAndFilledText("45", 16, 60)
    }

    if (state === states.countdown) {
        // reset everything

        // countdown

        // move to running
    }

    if (state === states.score) {
        // play death sound
        // make birdy drop
        // show score
        strokedAndFilledText("45", 16, 60)
        
        
    }


    if (state === states.start) {
        // show start screen
    }

   

 
    ground.draw()
    bird.draw()
 
    // reset
    input.resetKeyPressedEvents()
    
    requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
console.log(ctx)
export { ctx, assets }