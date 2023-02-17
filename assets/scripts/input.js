export const input = {
    mouseClickEvents: {},
    keyPressedEvents: {},
    GetMouseButtonDown() {

    },
    getKeyPressed(code) {
        if (this.keyPressedEvents[code]) return true
        return false
    },
    getMouseButtonClick(button) {
        if (this.mouseClickEvents[button]) return true
        
        return false
    },
    resetKeyPressedEvents() {
        this.keyPressedEvents = {}
    },
    resetMouseClickEvents() {
        this.mouseClickEvents = {}
    }
}

document.addEventListener("keydown", (event) => {
    if (!event.repeat) {
        input.keyPressedEvents[event.code] = true
    }  
})

document.addEventListener("mouseup", (event) => {
   input.mouseClickEvents[event.button] = true

   return false
})
