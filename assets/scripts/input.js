export const input = {
    keyPressedEvents: {},
    getKeyPressed(code) {
        if (this.keyPressedEvents[code]) return true
        return false
    },
    resetKeyPressedEvents() {
        this.keyPressedEvents = {}
    }
}

document.addEventListener("keydown", (event) => {
    if (!event.repeat) {
        input.keyPressedEvents[event.code] = true
    }  
})