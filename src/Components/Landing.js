import { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export class Landing extends Component{

  constructor() {
    super()
    this.state={

    }
  }

  delay = ms => new Promise(res => setTimeout(res, ms))

  async playclick(){
    document.getElementById("block").className = "flex items-center justify-center transform -translate-y-3.5 -translate-x-3.5"
    window.location.href = '/game'
  }

  holdin (){
  document.getElementById("block").className = "flex items-center justify-center transform translate-y-3.5 translate-x-3.5"
}

  render () {

    return (
      <div>
        <div className="fixed w-screen h-10">
            <div className="select-none pt-20 text-right transform -translate-y-20 bg-yellow-900">            
              <Link to="/Whitepaper" className="" style={{fontFamily:"Broken Console", fontSize:"20px"}}>Whitepaper</Link> 
            </div>
        </div>
        <div className="bg-white h-screen grid grid-col-6 gap-4 k">
          <div className="col-start-1 col-span-4">
            <div className=" flex justify-center items-center ">
              <div className="text-purple-800 pt-8" style={{fontFamily:"Broken Console",filter: "drop-shadow(5px 5px 0 #000000)", fontSize:"5.5rem"}}>
                PIXEL NFT
              </div>
            </div>
            <div className="">
              <img src="coin.gif"className=" select-none transform scale-150 pb-44 translate-x-2 -translate-y-14" style={{paddingLeft:"52rem", userSelect:"none"}}/>
            </div>
          </div>
          <div className="col-start-1 col-span-4 ">

          </div>
          <div className="col-start-1 col-span-4  ">
            <div className="select-none flex items-center justify-center pt-20">
              <input className="rounded-3xl" type="image" id="block" src="/playbutt.png" onMouseDown={() => {this.holdin()}} onClick={() => {console.log("playing"); this.playclick()}} />
            </div>
          </div>
          </div>
      </div>
    );
  }

}


