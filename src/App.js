import logo from './logo.svg';
import { Component } from 'react';
import './App.css';

class App extends Component{

  constructor(){
    super()
    this.state={

    }
  }

  getElementTopLeft(id) {

    var ele = document.getElementById(id);
    var top = 0;
    var left = 0;
   
    while(ele.tagName != "BODY") {
        top += ele.offsetTop;
        left += ele.offsetLeft;
        ele = ele.offsetParent;
    }
   
    return { top: top, left: left };
   
}

  async componentDidMount (){
    document.addEventListener("keydown", async (event) => {
    console.log(event)
    if (event.key === "ArrowUp") {
      document.getElementById("block").style.top = `${this.getElementTopLeft("block").top-10}px`
    } else if(event.key === "ArrowLeft") {
      document.getElementById("block").style.left = `${this.getElementTopLeft("block").left-10}px`
    } else if (event.key === "ArrowDown") {
      document.getElementById("block").style.top = `${this.getElementTopLeft("block").top+10}px`
    } else if(event.key === "ArrowRight") {
      document.getElementById("block").style.left = `${this.getElementTopLeft("block").left+10}px`
    }
  });
  }
  
  mm(e){
    var coords = "X coords: " + e.clientX + ", Y coords: " + e.clientY;
    console.log(coords);
    document.getElementById("demo").innerHTML = coords
    console.log(document.getElementById("block"))
    document.getElementById("block").style.left = `${e.clientX}px`
    document.getElementById("block").style.top = `${e.clientY}px`
    if (e.clientX == 100, e.clientY == 100 ){
      document.getElementById("block").className = "w-10 h-10 bg-red border-4 rounded-full"
    } else {
      document.getElementById("block").className = "w-10 h-10 bg-white rounded-full"
    }
   }

  render(){
  return (
    <div className="App" onMouseMove={(e) => {this.mm(e)}} className="text-white h-screen border-4 bg-black overflow-hidden">
      <div className="flex justify-center items-center h-96 w-screen border-4">
        <div className="rounded-full border-4 w-52 h-60 m-60">
          <div id="block" className="w-10 h-10 bg-white rounded-full" style={{position: 'absolute'}}></div>
        </div>
      </div>
    <div id="demo" className="ml-20">
      hi
    </div>
    </div>
  );
}}

export default App;
