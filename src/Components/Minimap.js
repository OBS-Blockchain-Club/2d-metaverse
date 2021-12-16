import { Component } from "react";
import { 
    GameOptions, 
    PopupMap 
} from "./index"

export class Minimap extends Component {
    constructor(props) {
        super(props)   
    }

    render() {
        const account = this.props.account
        const shortenedAcc = this.props.account ? account.substring(0, 6) + '...' + account.substring(account.length-5, account.length) : ''
        const miniX = (this.props.x/2380)*280;
        const miniY = (this.props.y/2380)*280;
        const mapEnabled = GameOptions.minimap;
        const statsEnabled = GameOptions.stats;
        return(
            <div>
                { mapEnabled ?
                    <div>
                        <div className='float-right text-right items-end bg-gray-200 bg-opacity-70 rounded-md' style={{position: 'absolute', top: 2, right: 5, padding: '145px 145px', fontSize: '1rem', color: 'rgba(20, 20, 20, 0.6)', fontSize: '1.2rem'}}>
                            <div className='opacity-70 absolute top-0 right-0' style={{height: '280px', backgroundImage: 'url("https://i.imgur.com/a993R8f.png")', width:'280px', backgroundSize: '100%', top: 5, right: 5}}>
                                <img className='relative' src='miniplayer.png' width='3' style={{top: miniY, left: miniX, filter: 'invert(100%)'}} />
                            </div>
                        </div>
                        <PopupMap x={this.props.x} y={this.props.y} />
                    </div>
                    : null
                }
                { statsEnabled ?
                    <div>
                        <div className='float-right text-right items-end bg-gray-200 bg-opacity-50 rounded-md' style={{position: 'absolute', top: 295.5, right: 5, padding: '0.4rem 0.2rem', fontSize: '1rem', color: 'rgba(20, 20, 20, 0.6)', fontSize: '1.2rem'}}>
                            <div className='font-pixelated inline-block px-5 text-black'><p className={`text-gray-600 inline-block`}></p>100 $LIFE</div>
                            <div className='font-pixelated inline-block text-black '>{shortenedAcc}</div>
                            <br/>
                            <div className='inline-block text-black' id='coords'>
                                <div className='font-pixelated'><p className='px-10 inline-block'>X: {parseInt(this.props.x)}</p>  Y: {parseInt(-this.props.y)}</div>
                            </div>
                        </div>
                    </div>
                    : null
                }
            </div>
        )
    }
}