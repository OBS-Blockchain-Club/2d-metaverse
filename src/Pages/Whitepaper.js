import { Component } from "react";
import '../App.css';

export class Whitepaper extends Component {
      render () {
        return (
          <div className='px-5 pt-10 font-pixelated'>
            <div className="  text-purple-700 transform translate-y-5" style={{fontFamily:"Broken Console", filter: "drop-shadow(5px 5px 0 #4C1D95)", fontSize:"5.5rem"}}>
              Whitepaper
            </div>
            <div className='font-pixelated text-left' style={{color: "rgb(20, 191, 24)"}}>
              <p>
              Hello, this is the white paper
              </p>
            </div>
          </div>
        );
      }
    
}
