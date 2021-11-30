
import { Component } from 'react';
import './game.css';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import socketClient from "socket.io-client";

class Game extends Component{

  constructor(){
    super()
    this.state={
      speed: 1.5,
      shotCount: 0,
      account: null,
      web3: new Web3(window.ethereum),
      pixelSize: parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
      ),
      x: 0,
      y: 1,
      monsterX: Math.random() *200,
      monsterY: Math.random() *200
    }

    this.character = null;
    this.map = null;
    this.socket = socketClient('wss://pixel-art.kesarx.repl.co');
    this.placeCharacter = this.placeCharacter.bind(this)
    this.gameLoop = this.gameLoop.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.shootFromCoords = this.shootFromCoords.bind(this)
    this.players = [];
    this.health = 58;
    this.chat = {};
    this.current_directions = [];
    this.messages = []
        
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
      console.log((this.state.x - this.state.monsterX) + ' ' + (this.state.y - this.state.monsterY))
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

    let color = 'green'
    if(this.health <= 20) {
      color = 'red'
    } else if(this.health <= 60) {
      color = 'yellow'
    }
    return (
        <div className="App">
            <div className="camera" style={{height: '100vh', width: '100vw'}}>
                <div className="map pixel-art" id='map'>
                    {/* <div id='monster' className="character" facing='down' walking="false" style={{transform: `translate3d( ${this.players[address].x * this.state.pixelSize}px, ${this.players[address].y * this.state.pixelSize}px, 0)`}}>
                      <div className="shadow pixel-art"></div>
                      <div className="character_spritesheet pixel-art"></div>
                    </div> */}
                    <div id='otherPlayers'></div>
                    <div className="character" facing="down" walking="false">
                        <div className="shadow pixel-art"></div>
                        <div className="character_spritesheet pixel-art"></div>
                        <div className={`bg-${color}-500 h-3 text-center text-sm leading-4`} style={{position: 'relative', width: `${this.health}%`}}>
                          <p className='text-center font-pixelated text-xs'>
                            {this.health}
                          </p>
                        </div>
                    </div>
                    
                </div>
                <div id='playershot'></div>
            </div>
            <div id='stats' className='text-right bg-gray-200 bg-opacity-50 rounded-md' style={{position: 'absolute', top: 0, right: 0, padding: '0.4rem 0.5rem', fontSize: '1rem', color: 'rgba(20, 20, 20, 0.6)', fontSize: '1.2rem'}}>
              <div className='font-pixelated inline-block px-5 text-black'><p className={`text-${color}-600 inline-block`}>{this.health}</p>$LIFE</div>
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