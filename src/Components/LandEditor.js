import { Component } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas'
import ReactDOM from 'react-dom';
import '../Pages/game.css';
import {
  Web3Manager,
  GameOptions,
  Utils,
  Item,
  Backpack,
  NFT,
  NFTframe
} from './index';

export class LandEditor extends Component{

  static players = [];

  constructor(){
    super()
    
    this.utils = new Utils();
    this.state={
      closeeditor : 'invisible',
      account: null,
      pixelSize: parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
      ),
      x: 0,
      y: 0,
    }

    this.character = null;
    this.map = null;
    this.placeCharacter = this.placeCharacter.bind(this)
    this.insertNewNFT = this.insertNewNFT.bind(this)
    this.gameLoop = this.gameLoop.bind(this)
    this.players = [];
    this.current_directions = [];
    this.insertedNFTs = [];
        
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
    this.setState({ account: await Web3Manager.connectWeb3() })
    this.character = document.querySelector(".character");
    this.map = document.querySelector(".map");
    this.gameLoop()

    document.addEventListener("keydown", (e) => {
      var dir = this.keys[e.which];
      if (dir && this.current_directions.indexOf(dir) === -1) {
        this.current_directions.unshift(dir)
      }
    })
   
    document.addEventListener("keyup", (e) => {
      var dir = this.keys[e.which];
      var index = this.current_directions.indexOf(dir);
      if (index > -1) {
        this.current_directions.splice(index, 1)
      }
    });
  }

  placeCharacter () {
    const held_direction = this.current_directions[0];
    if (held_direction) {
       if (held_direction === this.directions.right && this.state.x + GameOptions.speed <= 205) {this.setState({x: this.state.x + GameOptions.speed});}
       if (held_direction === this.directions.left && this.state.x - GameOptions.speed >= -13) {this.setState({x: this.state.x - GameOptions.speed});}
       if (held_direction === this.directions.down && this.state.y + GameOptions.speed <= 190) {this.setState({y: this.state.y + GameOptions.speed});}
       if (held_direction === this.directions.up && this.state.y - GameOptions.speed >= -30) {this.setState({y: this.state.y - GameOptions.speed});;}
       this.character.setAttribute("facing", held_direction);
    }
    this.character.setAttribute("walking", held_direction ? "true" : "false");
    
    var camera_left = this.state.pixelSize * window.innerWidth/4;
    var camera_top = this.state.pixelSize * window.innerHeight/4.2;
    
    this.map.style.transform = `translate3d( ${-this.state.x*this.state.pixelSize+camera_left}px, ${-this.state.y*this.state.pixelSize+camera_top}px, 0 )`;
    this.character.style.transform = `translate3d( ${this.state.x*this.state.pixelSize}px, ${this.state.y*this.state.pixelSize}px, 0 )`;  
  }

  insertNewNFT (metadata) {
    if(this.insertedNFTs.length < 5) {
      this.insertedNFTs.push(metadata)
      const nfts = (
        <div>
          {this.insertedNFTs.map((metadata, index) => (
            <Item key={index} draggable={true} metadata={metadata} coords={[100, 200]} id={"nft#" + index} scale={[100, 100]} />                  
          ))}
        </div>
      )
      ReactDOM.render(nfts, document.getElementById("nfts"))
    }
  }
 
  gameLoop() {
    this.placeCharacter();
    window.requestAnimationFrame(() => {
      this.gameLoop()
    })
  }

  render() {
    return (
        <div className="App overflow-hidden">
            <div className="camera" style={{height: '100vh', width: '100vw'}}>
              <div onClick={()=> {window.location.href = '/game';}} className='text-red-500 cursor-pointer text-4xl absolute top-3 right-3 font-pixelated' >
                X
              </div>
                <div className="map pixel-art" id='map'>
                    <div id='nfts'></div>
                    <div className="character" facing="down" walking="false">
                        <div className="shadow pixel-art"></div>
                        <div className="character_spritesheet pixel-art"></div>
                    </div>
                </div>
            </div>
            <div>
              <div className='float-left text-left items-end bg-gray-200 bg-opacity-50 rounded-md' style={{position: 'absolute', top: 5, left: 5, padding: '0.4rem 0.2rem', fontSize: '1rem', color: 'rgba(20, 20, 20, 0.6)', fontSize: '1.2rem'}}>
                <div className='font-pixelated inline-block text-black'>Land Editor</div>
                <br/>
                <div className='inline-block text-black' id='coords'>
                  <div className='font-pixelated'><p className='pr-10 inline-block'>X: {parseInt(this.state.x)}</p>  Y: {parseInt(-this.state.y)}</div>
                </div>
              </div>
             </div>
             <NFTframe/>
            <Backpack account={this.state.account} insertNFTFromBackpack={this.insertNewNFT}/>
        </div>
    );
  }
}