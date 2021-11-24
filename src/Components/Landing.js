import { Component } from 'react';


export class Landing extends Component{

  constructor() {
    super()
    this.state={

    }
  }

  delay = ms => new Promise(res => setTimeout(res, ms))

  async componentDidMount () {

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

  async playclick(){
    var TopLeft = this.getElementTopLeft("block");
    document.getElementById("block").style.left = `${TopLeft.left-10}px`
    document.getElementById("block").style.top = `${TopLeft.top-10}px`
  }

  holdin (){
  var TopLeft = this.getElementTopLeft("block");
  document.getElementById("block").style.left = `${TopLeft.left+10}px`
  document.getElementById("block").style.top = `${TopLeft.top+10}px`
}

  render () {

    return (
      <div>
        <div className="bg-white h-screen">
            <div className="">
              <div className=" flex justify-center items-center">
                <img src='Title.png' className="transform scale-150 pt-5" />
              </div>
              <div className="pl-96">
                <img src="coin.gif"className="transform scale-150 pb-44" style={{paddingLeft:"33rem"}}/>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img id="block" src="playbutt.png" className="pt-96" style={{position:"absolute"}} onMouseDown={() => {this.holdin()}} onClick={() => {console.log("playing"); this.playclick()}}/>
            </div>
        </div>
        <div>
            <div className="grid grid-cols-2 gap-4 h-screen">
              <div className="py-60">
              </div>
              <div className="py-60">
                <p>some cool image</p>
              </div>
            </div>
        </div>
      </div>
    );
  }

}


