import { Component } from "react";
import ReactDOM from 'react-dom';
import { Web3Manager } from "..";

export class Backpack extends Component {

    constructor(props) {
        super(props)
        this.state={
            display: 'none',
            whenbackon: '',
            animation: ''
        }
        this.displayNFTs = this.displayNFTs.bind(this)
        this.parsedNFTs = []
    }

    async componentDidMount() {
        this.displayNFTs(await Web3Manager.connectWeb3())
    }

    async displayNFTs(address) {
        const fetchedNfts = await Web3Manager.getNFTsfromSubgraph(address)
        const nfts = fetchedNfts.data.tokens
        Object.keys(nfts).map((index) => {
            console.log(nfts[index])
        })
        
    }

    delay = ms => new Promise(res => setTimeout(res, ms))

    async showbackpack(){
        if(this.state.display == 'none'){
            this.setState({display:"block", whenbackon: 'backa', animation: 'backpa'})
        }else{
            this.setState({whenbackon:'backo', animation: 'backpo'})
            await this.delay(250)
            this.setState({display:'none'})
        }
    }

    render() {
        return(
            <div className="flex justify-center items-center">
                <div className={`absolute bottom-0 w-40 h-7 bg-opacity-70 bg-gray-200 flex justify-center items-center ${this.state.whenbackon}`} onClick={()=>{this.showbackpack()}} >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div className={`absolute bottom-0  bg-opacity-70 bg-gray-200 ${this.state.animation}`} style={{display:`${this.state.display}`}}></div>
            </div>
        )
    }
}