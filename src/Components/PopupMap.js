import { Component } from "react";
import { Modal } from "react-bootstrap";
import { GameOptions } from ".";

export class PopupMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMiniMap: false,
        }
    }

    async componentDidMount() {
        document.addEventListener("keydown", (e) => {
            if(e.key == 'm'){
              this.showMap()
            }
        })
    }

    showMap () {
        if (this.state.showMiniMap == false){
          this.setState({showMiniMap: true})
        } else {
          this.setState({showMiniMap: false})
        }
    }

    render() {
        const miniX = (this.props.x/2380)*280;
        const miniY = (this.props.y/2380)*280;
        return(
            <div>
                <Modal show={this.state.showMiniMap} animation={false} centered size='lg'>
                    <img style={{padding: '1px'}} src={GameOptions.mapUrl} />
                </Modal>
            </div>
        )
    }
}