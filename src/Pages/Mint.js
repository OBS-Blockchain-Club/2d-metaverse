import { Component } from "react";
import Web3 from "web3";

export default class Mint extends Component {

    constructor() {
        super()
        this.state = {
            web3: new Web3(window.ethereum)
        }

        this.classes = [
          {
            name: 'Land',
            image: 'character.png',
            minted: '0/1000',
            moreInfo: '',
            mint: '0x',
            bgColor: 'bg-gradient-to-tr from-blue-400 to-purple-500'
          },
          {
            name: 'Adventurers',
            image: 'character.png',
            minted: '0/6000',
            moreInfo: '',
            mint: '0x',
            bgColor: 'bg-gradient-to-tr from-green-400 to-yellow-500'
          },
          {
            name: 'Monsters',
            image: 'character.png',
            minted: '0/4000',
            moreInfo: '',
            mint: '0x',
            bgColor: 'bg-gradient-to-tr from-red-300 to-pink-800'
          }
        ]

    }

    delay = ms => new Promise(res => setTimeout(res, ms))

    render() {
        return(
            <div className="pt-24">
                <div id="title" className="text-white text-5xl pb-10 font-pixelated pt-4 ">MINT YOUR CHARACTER</div>
                <div className="flex justify-center items-center xl:mx-20">
                  <div className="bg-indigo-400 grid px-10 sm:grid-cols-1 lg:grid-cols-3 mx-20 rounded justify-center items-center" style={{width:"90%"}}>
                    {this.classes.map((info, index) => (
                      <div key={index} className="flex justify-center items-center">
                        <div className={`w-96 my-10 mx-3 border-8 text-white bg-opacity-20 ${info.bgColor}`}>
                          <div className="justify-center items-center">
                            <div className="text-2xl pt-8 font-pixelated" style={{filter: "drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.7))"}}>{info.name}</div>
                          </div>
                          <div className="flex justify-center items-center">
                            <img src={info.image}></img>
                          </div>
                          <div className="font-pixelated pt-4 pb-8">
                            {info.minted}
                          </div>
                          <div className="font-pixelated pb-10"><button>Mint</button></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
        )
    }

}