import socketClient from "socket.io-client";

export default class WebsocketManager {
    constructor() {
        super()
        this.socket = socketClient('wss://pixel-art.kesarx.repl.co');
    }
    
    sendMessage(message, address) {
        this.socket.emit('message', {address, message})
    }

    getPlayers() {

    }
    
    emitMovement(directions, account, x, y, character) {
        if(directions.length !== 0) {
            this.socket.emit('move', {
                account,
                x,
                y,
                facing: character.getAttribute("facing"),
                walking: character.getAttribute("walking")
            })
        }
    }

    getMonsters() {}

}