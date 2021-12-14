import WebsocketManager from "./WebsocketManager";
import ReactDOM from 'react-dom';
import { Component } from "react";

export class Chat extends Component {

    constructor(props) {
        super(props)
        this.messages = [];
        this.submitMessage.bind(this)
    }

    async componentDidMount() {
        WebsocketManager.socket.on('newMessage', (msg) => {
            this.messages.push(msg)
            const chat = (
              <div>
                {this.messages.map((msg, index) => (
                    <div key={index} id={index} className='text-left text-sm font-pixelated' style={{ overflow: 'y-scroll', maxHeight: '40%'}}>
                      <p className='inline-block'>{msg.address.substring(0, 7)}</p>
                      <p className='inline-block pl-2'>{msg.message}</p>
                    </div>
                ))}
              </div>
            )
            ReactDOM.render(chat, document.getElementById('chat'))
          })
    }
    
    submitMessage(e) {
        if(e.key==='Enter'){
            WebsocketManager.sendMessage(e.target.value, this.props.account); 
            document.getElementById('input').value = ''
        }
    }

    render() {
        return(
            <div style={{position: 'absolute', bottom: 0, left: 0, fontSize: '1.4rem', padding: '5px 5px', opacity: 0.7, width: '15%'}}>
              <div>
                <div id='chat' className='bg-gray-200 bg-opacity-50 max-h-56'></div>
                <div>
                    <input id='input' autoComplete='off' placeholder='Type your message here...' className='w-full focus:outline-none font-pixelated' style={{backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '0.2rem', padding: '0.4rem 0.2rem', fontSize: '1rem'}} onKeyDown={(e) => {this.submitMessage(e)}}/>
                </div>
              </div>
            </div>
        )
    }

}