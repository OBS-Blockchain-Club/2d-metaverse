import { Component } from "react";
import { Utils, Web3Manager } from "..";

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
        this.utils = new Utils();
    }

    async componentDidMount() {
        this.displayNFTs(await Web3Manager.connectWeb3())
    }

    async displayNFTs(address) {
        await Web3Manager.getNFTsfromSubgraph(address)
        .then((nfts) => {
            const data = nfts.data.tokens
            Object.keys(data).map(async (index) => {
                var metadata = await Web3Manager.fetchNFTMetadata(data[index].tokenURI)
                if(metadata && metadata?.image !== undefined) {
                    if(metadata?.image !== undefined && metadata.image.startsWith("ipfs://")) {
                        metadata.image = metadata.image.replace("ipfs://", "https://gateway.ipfs.io/ipfs/")
                    }
                    this.parsedNFTs.push(metadata)
                }
            })
        })
    }

    removeNFTFromBackpack(index) {
        this.props.insertNFTFromBackpack(this.parsedNFTs[index])
        this.parsedNFTs.splice(index, 1)
    }

    async showbackpack(){
        if(this.state.display == 'none'){
            this.setState({display:"block", whenbackon: 'backa', animation: 'backpa'})
        }else{
            this.setState({whenbackon:'backo', animation: 'backpo'})
            await this.utils.delay(250)
            this.setState({display:'none'})
        }
    }

    render() {
        return(
            <div className="flex justify-center items-center">
                <div className={`absolute bottom-0 h-7 bg-opacity-70 bg-gray-200 flex justify-center items-center ${this.state.whenbackon}`} onClick={()=>{this.showbackpack()}} >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className={`absolute bottom-0 bg-opacity-90 overflow-x-scroll overflow-y-hidden bg-gray-200 p-2 ${this.state.animation}`} style={{display:`${this.state.display}`, maxWidth: '60%'}}>
                        { this.parsedNFTs.length > 0 ?
                            <div className="inline-flex max-h-full">
                                {Object.keys(this.parsedNFTs).map((index) => (
                                    <div key={index} className='inline-block p-1' style={{ width: '100px', maxWidth: '100px', height: "200px", maxHeight: "200px"}}>
                                        <div className="bg-gray-500 font-pixelated border-opacity-0 hover:border-opacity-70 border-blue-300 border-2" style={{fontSize: '14px'}}>
                                            {this.parsedNFTs[index].name.substring(0, 5) + " ... " + this.parsedNFTs[index].name.substring(this.parsedNFTs[index].name.length-5, this.parsedNFTs[index].name.length)}
                                            <img src={this.parsedNFTs[index].image} />
                                            <div className="font-pixelated py-1">
                                                <button className="px-2 rounded-sm bg-blue-400" onClick={() => {this.removeNFTFromBackpack(index)}}>Insert</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            : <div className="font-pixelated">No NFTs Available</div>
                        }
                </div>
            </div>
        )
    }
}