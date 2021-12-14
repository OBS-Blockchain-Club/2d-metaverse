import socketClient from "socket.io-client";
import Game from "../Pages/Game";

export class WebsocketManager {
    static socket = socketClient('wss://pixel-art.kesarx.repl.co');
    
    static sendMessage(message, address) {
        this.socket.emit('message', {address, message})
    }

    getPlayers() {

    }
    
    static emitMovement(directions, address, x, y, character) {
        if(directions.length !== 0) {
            this.socket.emit('move', {
                address,
                x,
                y,
                facing: character.getAttribute("facing"),
                walking: character.getAttribute("walking")
            })
        }
    }

    static verify (account) {
        this.socket.emit('verify', account)
    }

    static getPlayers () {
        this.socket.on('getPlayers', (msg) => {
            console.log(msg)
        })
    }

    static getMovement (account) {
        this.socket.on('move', (msg) => {
            if(account !== msg.address) {
              Game.players[msg.address] = msg;
            }
          })
    }
}