import { Component } from "react"
import '../Pages/game.css';
import ReactDOM from 'react-dom';
export class Multiplayer extends Component {
    constructor(props) {
        super(props);

        this.multiplayerLoop = this.multiplayerLoop.bind(this)
    }

    renderOtherPlayers() {
        const otherPlayers = (
          <div>
              {Object.keys(this.props.players).map((address, info) => (
                <div key={address} id={address} className="character" facing={this.props.players[address].facing} walking={this.props.players[address].walking} style={{transform: `translate3d( ${this.props.players[address].x * this.props.pixelSize}px, ${this.props.players[address].y * this.props.pixelSize}px, 0)`}}>
                  <div className="shadow pixel-art"></div>
                  <div className="character_spritesheet pixel-art"></div>
                </div>
              ))}
          </div>
        )
        ReactDOM.render(otherPlayers, document.getElementById('otherPlayers'))
    }
    
    multiplayerLoop() {
        window.requestAnimationFrame(() => {
          this.multiplayerLoop()
          this.renderOtherPlayers()
        })
    }
    

    render() {
        return(
            <div id='otherPlayers'></div>
        )
    }
}