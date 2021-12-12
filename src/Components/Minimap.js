import GameOptions from "./GameOptions"

export default class Minimap {
    constructor(props) {
        super(props)
        
    }

    render() {
        return(
            <div>
                <div className='float-right text-right items-end bg-gray-200 bg-opacity-70 rounded-md' style={{position: 'absolute', top: 2, right: 5, padding: '145px 145px', fontSize: '1rem', color: 'rgba(20, 20, 20, 0.6)', fontSize: '1.2rem'}}>
                    <div className='opacity-70 absolute top-0 right-0' style={{height: '280px', backgroundImage: `url("${GameOptions.mapUrl}")`, width:'280px', backgroundSize: '100%', top: 5, right: 5}}>
                        <img className='relative' src='miniplayer.png' width='3' style={{top: miniY, left: miniX, filter: 'invert(100%)'}} />
                        <div id='minimonsters'></div>
                    </div>
                </div>
                <div className='float-right text-right items-end bg-gray-200 bg-opacity-50 rounded-md' style={{position: 'absolute', top: 295.5, right: 5, padding: '0.4rem 0.2rem', fontSize: '1rem', color: 'rgba(20, 20, 20, 0.6)', fontSize: '1.2rem'}}>
                    <div className=' font-pixelated inline-block px-5 text-black'><p className={`text-${color}-600 inline-block`}>{this.state.health}</p>$LIFE</div>
                    <div className='font-pixelated inline-block text-black '>{this.props.shortenedAcc}</div>
                    <br/>
                    <div className='inline-block text-black' id='coords'><div className='font-pixelated'><p className='px-10 inline-block'>X: {parseInt(this.state.x)}</p>  Y: {parseInt(-this.state.y)} </div></div>
                </div>
            </div>
        )
    }
}