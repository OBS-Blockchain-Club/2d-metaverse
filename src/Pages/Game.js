
import { Component } from 'react';
import './game.css';
import Utils from '../Components/service';
import {
  Chat,
  Minimap,
  Web3Manager,
  BaseGame,
  WebsocketManager,
  GameOptions,
  Map
} from '../Components/index';

class Game extends Component{

  static players = [];

  constructor(){
    super()
    
    this.utils = new Utils();
    this.state={
      account: null,
      x: this.utils.randomIntFromInterval(600, 800),
      y: this.utils.randomIntFromInterval(1400, 1700),
    }
  }

  createdivs(){
    let html = ''
    for(var x=0; x < 100; x++){
        let htmlSegment = `<div class="absolute top-${x*10} mx-39 hover:bg-blue-500">
                          <div>
                            Hover!!
                          </div>
                        </div>`;

        html += htmlSegment;
      }
      // let container = document.getElementById("rand");
      // container.innerHTML = html;
  }
  
  async welcome(){
    this.setState({welcshow: 'visible', welctext:'Hi welcome to Pixel NFT!'})
    await this.utils.delay(3000)
    this.setState({welcshow: 'visible', welctext:'Remember to always be friendly and have fun!'})
    await this.utils.delay(3000)
    this.setState({welcshow: 'invisible'})
  }

  async componentDidMount () {
    this.welcome()
    this.createdivs()
    this.setState({ account: await Web3Manager.connectWeb3() }, () => {
      WebsocketManager.verify(this.state.account)
    })

  }

      // if( this.state.x <= 10 && this.state.y <= 10){
      //   document.getElementById("playeralert").className="absolute text-white visible"
      //   console.log("palyer in area")
      // } else {
      //   document.getElementById("playeralert").className="absolute text-white invisible"
      // }

  render() {
    return (
      <div className="App oveflow-hidden">
        <BaseGame/>
        <Chat account={this.state.account}/>
        <div className='flex justify-center items-center'>
          <div className={` absolute top-0 bg-gray-200 bg-opacity-50 rounded-md px-4 font-pixelated pt-2 py-2 text-black mt-6 text-xl ${this.state.welcshow}`}>{this.state.welctext}</div>
        </div>
      </div>
    );
  }
}

export default Game;