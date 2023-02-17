import { GameObject } from "@scripts/gameObject.js";
import { time } from "@scripts/time.js";

export class ParallaxBackground extends GameObject {

    backgroundScroll = 0
    scrollSpeed = -0
    loopingPoint = 0

    update() {
        this.backgroundScroll =  (this.backgroundScroll + this.scrollSpeed * time.deltaTime) % this.loopingPoint
        this.position.x = this.backgroundScroll
    }

}