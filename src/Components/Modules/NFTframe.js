import { Component } from "react";
import { Utils, Web3Manager } from "..";

export class NFTframe extends Component {

    constructor(props) {
        super(props)
        this.state={
        }
        this.utils = new Utils();
    }

    async componentDidMount() {
    }

    render() {
        return(
            <div className="absolute h-screen w-72  bg-blue-500 right-0">
                <div className="border-b">
                    <div className="pl-2">NFT title</div>
                </div>
                <div className="text-left pt-3 border-b" style={{paddingBottom:"620px"}}>
                 <div className="pl-2">Nft desc</div>  
                </div>
                <div>
                    <div className="pl-2 text-left">Other info</div>                  
                </div>
            </div>
        )
    }
}