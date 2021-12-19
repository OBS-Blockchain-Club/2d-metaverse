import { Component } from "react";

export class NFTPopup extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="absolute top-32 right-2 p-2 bg-blue-400 border-4 border-black text-left" style={{width: '300px', maxWidth: '30%', maxHeight: '70%'}}>
                <div className="text-2xl font-pixelated">
                    {/* {this.props.metadata.name} */}
                    hello
                </div>
                <div className="text-md font-pixelated">
                    {/* {this.props.metadata.description} */}
                </div>
                <div>
                    {/* <img src={this.props.metadata.image} width='100px' height='100px'/> */}
                </div>
                <div className="text-lg font-pixelated pt-4">
                    <a href={`https://opensea.io`} className="hover:text-black">View on OpenSea</a>
                </div>
            </div>
        )
    }
}