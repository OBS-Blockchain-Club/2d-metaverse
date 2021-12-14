import { Component } from 'react';
import '../App.css';

export class Landing extends Component{

  delay = ms => new Promise(res => setTimeout(res, ms))

  async playclick(){
    document.getElementById("block").className = " transform -translate-y-3.5 -translate-x-3.5"
    window.location.href = '/game'
  }

  holdin (){
    document.getElementById("block").className = "transform translate-y-3.5 translate-x-3.5"
  }

  render () {

    return (
      <div className=''>
        <div className='sliding'></div>
        <div>
          <div className="flex justify-center items-center ">
            <div className="text-purple-800 transform translate-y-20 font-ka1" style={{filter: "drop-shadow(5px 5px 0 #000000)", fontSize:"5.5rem"}}>
                PIXEL NFT
            </div>
          </div>
          <div className="select-none flex items-center justify-center pt-40 transform translate-y-40">
            <input className="rounded-3xl" type="image" id="block" src="/playbutt.png" onMouseDown={() => {this.holdin()}} onClick={() => {this.playclick()}}/>
          </div>
        </div>  
      </div>
    );
  }

}


