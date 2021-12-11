import { Component } from "react";
import Web3 from "web3";

export default class Mint extends Component {

    constructor() {
        super()
        this.state = {
            web3: new Web3(window.ethereum)
        }

    }

    delay = ms => new Promise(res => setTimeout(res, ms))

    componentDidMount(){
    }

    render() {
        return(
            <div className="pt-16 ">
                <div id="title" className="text-white text-5xl pb-10 font-pixelated pt-4 ">MINT YOUR CHARACTER</div>
                <div className="flex justify-center items-center">

                <div className="bg-indigo-400 h-64 grid grid-cols-3 pl-40 mx-20 rounded flex justify-center items-center" style={{width:"1500px"}}>

                  <div className="w-72 h-52 border-2 rounded text-white bg-gradient-to-tr from-blue-400 to-purple-500 relative">
                      <div className="absolute bottom-0 right-0 text-xs pr-1 cursor-pointer hover:underline">More info</div>
                    <div className="justify-center items-center border-b-2">
                     <div className="text-2xl font-bold pt-2 font-pixelated" style={{}}>Class Name</div>
                    </div>
                    <div className=" font-pixelated pt-4 pb-20">
                     Info about character
                    </div>
                    <div className=" font-pixelated"><button>Mint</button></div>
                  </div>

                  <div className="w-72 h-52 border-2 rounded text-white bg-gradient-to-tr from-green-400 to-yellow-500 relative">
                      <div className="absolute bottom-0 right-0 text-xs pr-1 cursor-pointer hover:underline">More info</div>
                    <div className="justify-center items-center border-b-2">
                     <div className="text-2xl font-bold pt-2 font-pixelated" style={{}}>Class Name</div>
                    </div>
                    <div className=" font-pixelated pt-4 pb-20">
                     Info about character
                    </div>
                    <div className=" font-pixelated "><button>Mint</button></div>
                  </div>

                  <div className="w-72 h-52 border-2 rounded text-white bg-gradient-to-tr from-red-300 to-pink-800 relative">
                      <div className="absolute bottom-0 right-0 text-xs pr-1 cursor-pointer hover:underline">More info</div>
                    <div className="justify-center items-center border-b-2">
                     <div className="text-2xl font-bold pt-2 font-pixelated" style={{}}>Class Name</div>
                    </div>
                    <div className=" font-pixelated pt-4 pb-20">
                     Info about character
                    </div>
                    <div className=" font-pixelated"><button>Mint</button></div>
                  </div>

                </div>

                </div>
            </div>
        )
    }

}