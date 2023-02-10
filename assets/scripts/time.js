export const time = {
    /**
     * The interval in milliseconds from the last frame to the current one
     */
    deltaTime: 0,

    lastTime: 0,

    /**
     * indicating the point in time when requestAnimationFrame() started to execute the callback function.
     */
    elapsedTime: 0,
    
    /**
     * The maximum value of Time.deltaTime in any given frame. 
     * This is a time in milliseconds that limits the increase of Time.time between two frames.
     */
    maximumDeltaTime: 0.1
}