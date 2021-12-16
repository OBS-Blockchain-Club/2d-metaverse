import { Component } from 'react';
import '../Pages/game.css';
import ReactDOM from 'react-dom';
import { Modal, Button } from "react-bootstrap";

export class Settings extends Component{

  constructor(){
    super()
    
    this.state={
        setshow: false
    }

  }

  async componentDidMount () {
    this.dragElement = this.dragElement.bind(this);
    this.gameLoop()
  }

  
  gameLoop() {
    window.requestAnimationFrame(() => {
      this.gameLoop()
        if (this.state.setshow == true){
            this.dragElement(document.getElementById("mydiv"));
        }
    })
  }

  dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  render() {
    return (
        <div className="inline-block absolute left-12 font-pixelated">
            <img className='w-7' onClick={()=>{this.setState({setshow:true})}}  src="gear.png"></img>
            <Modal show={this.state.setshow} size='lg'>
            <Modal.Header closeButton>
          <Modal.Title  className='font-pixelated'>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body  className='font-pixelated'>
        <div className='w-60 h-2 rounded-full bg-blue-500 '>
            <span id="mydiv" class="relative inline-flex rounded-full h-3 w-3 bg-purple-500"/>
        </div>
        
        </Modal.Body>
        <Modal.Footer  className='font-pixelated'>
            <Button onClick={()=>{this.setState({setshow:false})}}>Close</Button>
        </Modal.Footer>
            </Modal>
        </div>
    );
  }
}