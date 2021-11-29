import { Component } from "react";
import { Link } from 'react-router-dom';
import '../App.css';

export class Whitepaper extends Component {
    constructor() {
        super()
        this.state={
    
        }
      }
    
    
      render () {
    
        return (
          <div className="bg-black h-screen">
            <div className="fixed w-screen bg-blue-200">
              <div className="text-right">
                <Link to="/Whitepaper" className="pr-1 underline" style={{fontFamily:"Broken Console", fontSize:"20px", textDecorationColor:"#4C1D95"}}>Whitepaper</Link>
              </div>
            </div>
           <div className="fixed text-purple-800" style={{fontFamily:"Broken Console",filter: "drop-shadow(2px 2px 0 #000000)", fontSize:"25px"}}>
             <Link to="/">PIXEL NFT</Link>
           </div>

            <div className="text-purple-700 pb-20 transform translate-y-5" style={{fontFamily:"Broken Console", textAlign:"left", filter: "drop-shadow(5px 5px 0 #4C1D95)", fontSize:"5.5rem"}}>
              PIXEL NFT
            </div>
            <div style={{fontFamily:"Broken Console", color: "rgb(36, 211, 54", textAlign:"left"}}>
              Hello, this is the white paper
            </div>
          </div>
        );
      }
    
}
