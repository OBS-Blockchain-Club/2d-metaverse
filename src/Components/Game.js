
import { Component } from 'react';
import './game.css';
import ReactDOM from 'react-dom';
import socketClient from "socket.io-client";

class Game extends Component{

  constructor(){
    super()
    this.state={
      speed: 2,
      shotCount: 0,
    }

    this.character = null;
    this.map = null;
    this.socket = socketClient('wss://pixel-art.kesarx.repl.co');
    this.placeCharacter = this.placeCharacter.bind(this)
    this.gameLoop = this.gameLoop.bind(this)
    this.shootFromCoords = this.shootFromCoords.bind(this)

    this.x = 0
    this.y = 0

    this.current_directions = [];
        
    this.directions = {
      up: "up",
      down: "down",
      left: "left",
      right: "right",
    }
    this.keys = {
      87: this.directions.up,
      65: this.directions.left,
      68: this.directions.right,
      83: this.directions.down,
   }
  }

  async componentDidMount (){
    this.character = document.querySelector(".character");
    this.map = document.querySelector(".map");
    this.gameLoop()
    document.addEventListener("keydown", (e) => {
      var dir = this.keys[e.which];
      if (dir && this.current_directions.indexOf(dir) === -1) {
        this.current_directions.unshift(dir)
      }
   })
    this.socket.addEventListener('open', function(event) {
      console.log('connected to ws')
    })
   
    document.addEventListener("keyup", (e) => {
      var dir = this.keys[e.which];
      var index = this.current_directions.indexOf(dir);
      if (index > -1) {
        this.current_directions.splice(index, 1)
      }
    });

    document.addEventListener("mousedown", (e) => {
      this.shootFromCoords(window.innerWidth/2, window.innerHeight/2, e.clientX/4, e.clientY/4.2)
    });
  }
  
  placeCharacter () {
   
    var pixelSize = parseInt(
       getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
    );

    const held_direction = this.current_directions[0];
    if (held_direction) {
       if (held_direction === this.directions.right) {this.x += this.state.speed;}
       if (held_direction === this.directions.left) {this.x -= this.state.speed;}
       if (held_direction === this.directions.down) {this.y += this.state.speed;}
       if (held_direction === this.directions.up) {this.y -= this.state.speed;}
       this.character.setAttribute("facing", held_direction);
    }
    this.character.setAttribute("walking", held_direction ? "true" : "false");
    
    //Limits (gives the illusion of walls)
    var leftLimit = -8;
    var rightLimit = (16 * 11)+8;
    var topLimit = -8 + 32;
    var bottomLimit = (16 * 7);
    if (this.x < leftLimit) { this.x = leftLimit; }
    if (this.x > rightLimit) { this.x = rightLimit; }
    if (this.y < topLimit) { this.y = topLimit; }
    if (this.y > bottomLimit) { this.y = bottomLimit; }
    
    var camera_left = pixelSize * window.innerWidth/4;
    var camera_top = pixelSize * window.innerHeight/4.2;
    
    this.map.style.transform = `translate3d( ${-this.x*pixelSize+camera_left}px, ${-this.y*pixelSize+camera_top}px, 0 )`;
    this.character.style.transform = `translate3d( ${this.x*pixelSize}px, ${this.y*pixelSize}px, 0 )`;  
  }
 
  gameLoop() {
    this.placeCharacter();
    window.requestAnimationFrame(() => {
      this.gameLoop()
    })
  }

  shootFromCoords(x, y, toX, toY) {
    const angle = Math.atan2(toY - y, toX - x);
    const arrowId = 'arrow' + this.state.shotCount
    const shot = (
      <div id={arrowId} className='shot' style={{top: y+7, left: x+30, position: 'absolute'}}>
        <img src='shot.png' alt='fireball'/>
      </div>
    )
    ReactDOM.render(shot, document.getElementById('playershot'))
    setTimeout(() => {
      var arrow = document.getElementById(arrowId)
      arrow.style.transform = `translate3d(${toX}px,${toY}px, 0)`
    }, 200)
    this.setState({shotCount: this.state.shotCount + 1})
    ReactDOM.unmountComponentAtNode(document.getElementById(arrowId))
  }

  render() {
    return (
        <div className="App">
            <div className="camera" style={{height: '100vh', width: '100vw'}} onClick={(e) => {console.log(e.clientX)}}>
                <div className="map pixel-art">
                    <div className="character" facing="down" walking="true">
                        <div className="shadow pixel-art"></div>
                        <div className="character_spritesheet pixel-art"></div>
                    </div>
                </div>
                <div id='playershot'></div>
            </div>
        </div>
    );
  }
}

export default Game;