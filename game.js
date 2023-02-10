import { PipeManager } from "@scripts/pipeManagers.js"
import { GameObject } from "@scripts/gameObject.js"
import { input } from "@scripts/input.js"
import { time } from "@scripts/time.js"
import { Bird } from "@scripts/bird.js"

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

document.body.appendChild(canvas)

// 9:16
canvas.width = 288
canvas.height = 512

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
bird.position.addPosition(124, 240)

pipeManager.start()

function animate(unscaledTime = 0) {

    // compute time elapsed since last frame a.k.a delta time
    time.deltaTime = Number(((unscaledTime - time.lastTime) / 1000))

    // deltaTime value is capped to maximumDeltaTime
    time.deltaTime = Math.min(time.deltaTime, time.maximumDeltaTime)

    // update the last time with the current time
    time.lastTime = unscaledTime

    // deltaTime is added to elapsed time so far
    time.elapsedTime += time.deltaTime

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // update
    pipeManager.update()
    bird.update()

    // draw
    background.draw()
    pipeManager.draw()
    ground.draw()
    bird.draw()

    // reset
    input.resetKeyPressedEvents()

    requestAnimationFrame(animate)
}

requestAnimationFrame(animate)

export { ctx, assets }