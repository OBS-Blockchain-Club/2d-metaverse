
import { Component } from 'react';
import './game.css';
import {
  Chat,
  Web3Manager,
  BaseGame,
  WebsocketManager,
  Alert,
  Utils
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


  async componentDidMount () {
    this.createdivs()
    this.setState({ account: await Web3Manager.connectWeb3() }, () => {
      WebsocketManager.verify(this.state.account)
    })
    await this.utils.delay(2000)
    const alert = new Alert(`Hey ${this.state.account}!`, document.getElementById('alert'))
    await this.utils.delay(3000)
    alert.changeText('hello')
    await this.utils.delay(3000)
    alert.enableAlert('hide');
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
        <div id='alert'></div>
      </div>
    );
  }
}

export default Game;