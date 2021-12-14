
import { Component } from 'react';
import './game.css';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import socketClient from "socket.io-client";
import Utils from '../Components/service';
import GameOptions from '../Components/GameOptions';
import Web3Manager from '../Components/Web3Manager';

class Game extends Component{

  constructor(){
    super()
    
    this.utils = new Utils();
    this.state={
      speed: 1.5,
      shotCount: 0,
      account: null,
      web3: new Web3(window.ethereum),
      pixelSize: parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
      ),
      x: this.utils.randomIntFromInterval(600, 800),
      y: this.utils.randomIntFromInterval(1400, 1700),
    }

    this.character = null;
    this.map = null;
    this.socket = socketClient('wss://pixel-art.kesarx.repl.co');
    this.placeCharacter = this.placeCharacter.bind(this)
    this.gameLoop = this.gameLoop.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.players = [];
    this.chat = {};
    this.current_directions = [];
    this.messages = [];
        
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
    this.socket.on('getPlayers', (msg) => {
      console.log(msg)
        Object.keys(msg).map((address, info) => {
          console.log(msg[address].x)
          this.players[msg.address] = msg
        })
    })
    this.socket.on('move', (msg) => {
      if(this.state.account !== msg.address) {
        this.players[msg.address] = msg
      }
    })
    this.socket.on('newPlayer', (msg) => {
      if(msg.address !== this.state.account) {
        console.log( msg.address + ' joined.')
        console.log(msg)
        this.players[msg.address] = msg;
      }
    })
    this.socket.on('removePlayer', (msg) => {
      if(msg.address !== this.state.account) {
        console.log( msg.address + ' left.')
        delete this.players[msg.address]
      }
    })
    this.socket.on('newMessage', (msg) => {
      this.messages.push(msg)
      const chat = (
        <div>
          {this.messages.map((msg, index) => (
              <div key={index} id={index} className='text-left text-sm font-pixelated' style={{ overflow: 'y-scroll', maxHeight: '40%'}}>
                <p className='inline-block'>{msg.address.substring(0, 7)}</p>
                <p className='inline-block pl-2'>{msg.message}</p>
              </div>
          ))}
        </div>
      )
      ReactDOM.render(chat, document.getElementById('chat'))
    })
   
    document.addEventListener("keyup", (e) => {
      var dir = this.keys[e.which];
      var index = this.current_directions.indexOf(dir);
      if (index > -1) {
        this.current_directions.splice(index, 1)
      }
    });
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
        { // User rejected request 
          console.log(error) } 
        }
    }
  }
  

  placeCharacter () {
    const held_direction = this.current_directions[0];
    if (held_direction) {
       if (held_direction === this.directions.right) {this.setState({x: this.state.x + this.state.speed});}
       if (held_direction === this.directions.left) {this.setState({x: this.state.x - this.state.speed});}
       if (held_direction === this.directions.down) {this.setState({y: this.state.y + this.state.speed});}
       if (held_direction === this.directions.up) {this.setState({y: this.state.y - this.state.speed});;}
       this.character.setAttribute("facing", held_direction);
    }
    this.character.setAttribute("walking", held_direction ? "true" : "false");
    
    var camera_left = this.state.pixelSize * window.innerWidth/4;
    var camera_top = this.state.pixelSize * window.innerHeight/4.2;
    
    this.map.style.transform = `translate3d( ${-this.state.x*this.state.pixelSize+camera_left}px, ${-this.state.y*this.state.pixelSize+camera_top}px, 0 )`;
    this.character.style.transform = `translate3d( ${this.state.x*this.state.pixelSize}px, ${this.state.y*this.state.pixelSize}px, 0 )`;  
  }
 
  gameLoop() {
    this.placeCharacter();
    window.requestAnimationFrame(() => {
      this.gameLoop()
      this.emitMovement(this.current_directions)
      this.renderOtherPlayers()
      // this.dealPlayerDamage()
    })
  }

  renderOtherPlayers() {

    const otherPlayers = (
      <div>
          {Object.keys(this.players).map((address, info) => (
            <div key={address} id={address} className="character" facing={this.players[address].facing} walking={this.players[address].walking} style={{transform: `translate3d( ${this.players[address].x * this.state.pixelSize}px, ${this.players[address].y * this.state.pixelSize}px, 0)`}}>
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
        x: this.state.x,
        y: this.state.y,
        facing: this.character.getAttribute("facing"),
        walking: this.character.getAttribute("walking"),
      }
      this.socket.emit('move', playerData)
    }
  }

  sendMessage(msg) {
    const data = {
      address: this.state.account,
      message: msg
    }
    this.socket.emit('message', data)
  }

  render() {
    const account = this.state.account
    const shortenedAcc = this.state.account ? account.substring(0, 6) + '...' + account.substring(account.length-5, account.length) : ''
    const miniX = (this.state.x/2380)*280;
    const miniY = (this.state.y/2380)*280;

    return (
        <div className="App">
            <div className="camera" style={{height: '100vh', width: '100vw'}}>
                <div className="map pixel-art" id='map'>
                    <div id='otherPlayers'></div>
                    <div className="character" facing="down" walking="false">
                        <div className="shadow pixel-art"></div>
                        <div className="character_spritesheet pixel-art"></div>
                    </div>
                </div>
            </div>
            <div className='float-right text-right items-end bg-gray-200 bg-opacity-70 rounded-md' style={{position: 'absolute', top: 2, right: 5, padding: '145px 145px', fontSize: '1rem', color: 'rgba(20, 20, 20, 0.6)', fontSize: '1.2rem'}}>
              <div className='opacity-70 absolute top-0 right-0' style={{height: '280px', backgroundImage: 'url("https://i.imgur.com/a993R8f.png")', width:'280px', backgroundSize: '100%', top: 5, right: 5}}>
                  <img className='relative' src='miniplayer.png' width='3' style={{top: miniY, left: miniX, filter: 'invert(100%)'}} />
                </div>
            </div>
            <div className='float-right text-right items-end bg-gray-200 bg-opacity-50 rounded-md' style={{position: 'absolute', top: 295.5, right: 5, padding: '0.4rem 0.2rem', fontSize: '1rem', color: 'rgba(20, 20, 20, 0.6)', fontSize: '1.2rem'}}>
              <div className='font-pixelated inline-block px-5 text-black'><p className={`text-gray-600 inline-block`}></p>100 $LIFE</div>
              <div className='font-pixelated inline-block text-black '>{shortenedAcc}</div>
              <br/><div className='inline-block text-black' id='coords'><div className='font-pixelated'><p className='px-10 inline-block'>X: {parseInt(this.state.x)}</p>  Y: {parseInt(-this.state.y)} </div></div>
            </div>
            <div style={{position: 'absolute', bottom: 0, left: 0, fontSize: '1.4rem', padding: '5px 5px', opacity: 0.7, width: '15%'}}>
              <div>
                <div id='chat' className='bg-gray-200 bg-opacity-50 max-h-56'></div>
                <div>
                    <input id='input' autoComplete='off' placeholder='Type your message here...' className='w-full focus:outline-none font-pixelated' style={{backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '0.2rem', padding: '0.4rem 0.2rem', fontSize: '1rem'}} onKeyDown={(e) => {if(e.key==='Enter'){this.sendMessage(e.target.value); document.getElementById('input').value = '' }}}/>
                </div>
              </div>
            </div>
        </div>
    );
  }
}

export default Game;