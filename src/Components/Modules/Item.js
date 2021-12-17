import { Component } from "react";
import './modules.css'

export class Item extends Component {
    constructor(props) {
        super(props)
        this.itemClass = '';
    }

    componentDidMount () {
        if(this.props.draggable) {
            this.itemClass = 'item'
            this.dragElement(document.getElementById("item"));
        }
        this.dragElement = this.dragElement.bind(this);
    }

    dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        var width = this.props.scale[0]
        var height = this.props.scale[1] 
        if (document.getElementById(elmnt.id + "header")) {
          // if present, the header is where you move the DIV from:
          document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
          // otherwise, move the DIV from anywhere inside the DIV:
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
          var newX = (elmnt.offsetLeft - pos1);
          if((elmnt.offsetLeft - pos1) > 380) {
              newX = 380;
          } else if((elmnt.offsetLeft - pos1) < 0) {
              newX = 0;
          }

          var newY = (elmnt.offsetTop - pos2);
          if((elmnt.offsetTop - pos2) > 380) {
              newY = 380;
          } else if((elmnt.offsetTop - pos2) < 0) {
              newY = 0;
          }
          elmnt.style.top = newY + "px";
          elmnt.style.left = newX + "px";
        }
      
        function closeDragElement() {
          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.onmousemove = null;
        }
      }

    render() {
        return (
            <div>
                <img id='item' src={this.props.src} className={`absolute ${this.itemClass}`} style={{
                    left: this.props.coords[0], 
                    top: this.props.coords[1],
                    width: this.props.scale[0],
                    height: this.props.scale[1],
                    maxWidth: 200, 
                    maxHeight: 200,
                }} />
            </div>
        )
    }

}