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
            <span class="relative inline-flex rounded-full h-3 w-3 bg-purple-500 absolute top-0"/>
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