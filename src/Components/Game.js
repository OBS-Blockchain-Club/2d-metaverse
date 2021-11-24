
import { Component } from 'react';
import './game.css';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import socketClient from "socket.io-client";

class Game extends Component{

  constructor(){
    super()
    this.state={
      speed: 2,
      shotCount: 0,
      account: null,
      web3: new Web3(window.ethereum),
      pixelSize: parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
      ),
    }

    this.character = null;
    this.map = null;
    this.socket = socketClient('wss://pixel-art.kesarx.repl.co');
    this.placeCharacter = this.placeCharacter.bind(this)
    this.gameLoop = this.gameLoop.bind(this)
    this.shootFromCoords = this.shootFromCoords.bind(this)
    this.players = [];
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

  async componentDidMount () {
    this.connectWeb3()
    this.character = document.querySelector(".character");
    this.map = document.querySelector(".map");
    this.gameLoop()
    document.addEventListener("keydown", (e) => {
      var dir = this.keys[e.which];
      if (dir && this.current_directions.indexOf(dir) === -1) {
        this.current_directions.unshift(dir)
      }
    })
    this.socket.on('move', (msg) => {
      if(this.state.account !== msg.address) {
        this.players[msg.address] = msg
      }
    })
    this.socket.on('newPlayer', (msg) => {
      if(msg.address !== this.state.account) {
        this.players[msg.address] = msg;
      }
    })
    this.socket.on('removePlayer', (msg) => {
      if(msg.address !== this.state.account) {
        console.log( msg.address + ' left.')
      }
    })
   
    document.addEventListener("keyup", (e) => {
      var dir = this.keys[e.which];
      var index = this.current_directions.indexOf(dir);
      if (index > -1) {
        this.current_directions.splice(index, 1)
      }
    });

    // document.addEventListener("mousedown", (e) => {
    //   this.shootFromCoords(window.innerWidth/2, window.innerHeight/2, e.clientX/4, e.clientY/4.2)
    // });
  }
  
  async connectWeb3(){
    if (window.ethereum) { 
      try { 
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); 
        this.setState({ account: accounts[0]}, () => {
          this.socket.emit('verify', this.state.account)
        })
        }catch (error) { 
          if (error.code === 4001) 
        { // User rejected request } 
          console.log(error) } 
        }
    }
  }

  placeCharacter () {
   

    const held_direction = this.current_directions[0];
    if (held_direction) {
       if (held_direction === this.directions.right) {this.x += this.state.speed;}
       if (held_direction === this.directions.left) {this.x -= this.state.speed;}
       if (held_direction === this.directions.down) {this.y += this.state.speed;}
       if (held_direction === this.directions.up) {this.y -= this.state.speed;}
       this.character.setAttribute("facing", held_direction);
    }
    this.character.setAttribute("walking", held_direction ? "true" : "false");
    
    
    var camera_left = this.state.pixelSize * window.innerWidth/4;
    var camera_top = this.state.pixelSize * window.innerHeight/4.2;
    
    this.map.style.transform = `translate3d( ${-this.x*this.state.pixelSize+camera_left}px, ${-this.y*this.state.pixelSize+camera_top}px, 0 )`;
    this.character.style.transform = `translate3d( ${this.x*this.state.pixelSize}px, ${this.y*this.state.pixelSize}px, 0 )`;  
  }
 
  gameLoop() {
    this.placeCharacter();
    window.requestAnimationFrame(() => {
      this.gameLoop()
      this.emitMovement(this.current_directions)
      this.renderOtherPlayers()
    })
  }

  renderOtherPlayers() {

    const otherPlayers = (
      <div>
          {Object.keys(this.players).map((address, info) => (
            <div key={address} id={address} className="character" facing="down" walking="false" style={{transform: `translate3d( ${this.players[address].x * this.state.pixelSize}px, ${this.players[address].y * this.state.pixelSize}px, 0)`}}>
              <div className="shadow pixel-art"></div>
              <div className="character_spritesheet pixel-art"></div>
            </div>
          ))}
      </div>
    )
    ReactDOM.render(otherPlayers, document.getElementById('otherPlayers'))
  }

  emitMovement (directions) {
    if(directions.length !== 0) {
      const playerData = {
        address: this.state.account,
        x: this.x,
        y: this.y
      }
      this.socket.emit('move', playerData)
    }
  }

  shootFromCoords(x, y, toX, toY) {
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
    const account = this.state.account
    const shortenedAcc = this.state.account ? account.substring(0, 6) + '...' + account.substring(account.length-5, account.length) : ''
    return (
        <div className="App">
            <div className="camera" style={{height: '100vh', width: '100vw'}}>
                <div className="map pixel-art">
                    <div id='otherPlayers'></div>
                    <div className="character" facing="down" walking="true">
                        <div className="shadow pixel-art"></div>
                        <div className="character_spritesheet pixel-art"></div>
                    </div>
                </div>
                <div id='playershot'></div>
            </div>
            <div style={{position: 'absolute', top: 0, right: 0, fontSize: '1.4rem', border: '4px solid black', padding: '2px 15px', backgroundColor: 'gray', fontFamily: 'Press Start 2P', fontWeight: 'bolder'}}>{shortenedAcc}</div>
        </div>
    );
  }
}

export default Game;