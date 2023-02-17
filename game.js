import { ParallaxBackground } from "@scripts/parallaxBackground.js"
import { PipeManager } from "@scripts/pipeManagers.js"
import { input } from "@scripts/input.js"
import { time } from "@scripts/time.js"
import { Bird } from "@scripts/bird.js"
import { Vector2 } from "@scripts/math.js"

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
const gameWrapper = document.querySelector("#game-wrapper")

gameWrapper.appendChild(canvas)

function resize() {
    const dpr = window.devicePixelRatio

    canvas.style.width = "288px"
    canvas.style.height = "512px"

    canvas.width = 288 * dpr
    canvas.height = 512 * dpr
    
    ctx.scale(dpr,dpr)

    canvas.style.imageRendering = "pixelated"
    ctx.imageSmoothingEnabled = false

    // set text 
    ctx.font = "28px Retro"
    ctx.textAlign = "center"
}

resize()

window.addEventListener("resize", resize, false)

function strokedAndFilledText(text = "", x = 0, y = 0, color = "white") {
    ctx.strokeText(text, x, y + 4)
    ctx.lineWidth = 6

    ctx.strokeStyle = "#222034";
    ctx.strokeText(text, x, y)
    
    ctx.fillStyle = color
    ctx.fillText(text, x, y)
}

// fetch assets
const assets = new Map()

document.querySelectorAll("[data-asset]")
    .forEach(asset => assets.set(asset.getAttribute("data-asset"), asset))

// creating our gameObjects
const bird = new Bird(assets.get("bird"))
const background = new ParallaxBackground(assets.get("background"))
const ground = new ParallaxBackground(assets.get("ground"))

ground.scrollSpeed = -60
ground.loopingPoint = 288

background.scrollSpeed = -20
background.loopingPoint = 288

const pipeManager = new PipeManager()

// setting up starting position
ground.position.addPosition(0, 400)
bird.position = new Vector2(128, 195)

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
let state = states.start

// the user score
let score = 0

function animate(unscaledTime = 0) {

    // compute time elapsed since last frame a.k.a delta time
    time.deltaTime = Number(((unscaledTime - time.lastTime) / 1000))

    // deltaTime value is capped to maximumDeltaTime
    time.deltaTime = Math.min(time.deltaTime, time.maximumDeltaTime)

    // update the last time with the current time
    time.lastTime = unscaledTime

    // deltaTime is added to elapsed time so far
    time.elapsedTime += time.deltaTime


    // update --------------------------------------------------------------
    if (state === states.running) {
        // update
        bird.update()
        pipeManager.update()
        ground.update()
        background.update()

        function gameover() {
            bird.velocity.y = -1.5
            bird.dead = true
            state = states.score
        }
        
        pipeManager.pipes.forEach(pipePair => {

            // add score for every pipepair passed
            if (!pipePair.scored && pipePair.pipeTop.position.x + pipePair.pipeTop.sprite.width < bird.position.x) {
                pipePair.scored = true
                score += 1
            }

            // check collision on every pipe pair with the bird
            if (bird.collides(pipePair.pipeTop) || bird.collides(pipePair.pipeBottom)) {
                gameover() 
            } 
        })

        // check if we have a collsion with the ground
        if (bird.collides(ground)) gameover() 

        // if the bird goes offscreen
        if (bird.position.y < 0) gameover() 
    }

    if (state === states.score) {
        bird.update()
        // play death sound

        if(input.getMouseButtonClick(0)) {
            setTimeout(() => state = states.start, 0) // to go to the new frame
            
         }
        
    }


    if (state === states.start) {
        //click left mouse button to start
        if(input.getMouseButtonClick(0)) {
            bird.position = new Vector2(128, 195)
            bird.dead = false

            // du håller på att resta fålegn och dylikt
            state = states.running
            bird.velocity.y += bird.jumpForce
        }
    }

    // draw -----------------------------------------------------------------
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    background.draw()
    pipeManager.draw()
    
    if (state === states.start) {
        // logo text
        ctx.drawImage(assets.get("javascript-logo"), 180, 120)
        strokedAndFilledText("Flappy", 150, 120)
        strokedAndFilledText("Clone", 150, 167)

        // If we should "tap" or "click" sprite
        const pointingIcon = (window.matchMedia("(any-hover: none)").matches) ? assets.get("pointing-hand"): assets.get("pointing-mouse") 
        ctx.drawImage(pointingIcon, 110, 240)
    }

    if (state === states.running) {
        strokedAndFilledText(`${score}`, 150, 60)
    }

    if (state === states.score) {
        ctx.save()
        ctx.shadowColor = "rgba(0,0,0,0.4)"
        ctx.shadowBlur = 10
        ctx.drawImage(assets.get("frame"),34,120)
        
        ctx.restore()
        strokedAndFilledText(`${score}`, 150, 200)
    }

    ground.draw()
    bird.draw()

    // reset inputs
    input.resetKeyPressedEvents()
    input.resetMouseClickEvents()
    
    requestAnimationFrame(animate)
}

requestAnimationFrame(animate)

export { ctx, assets }