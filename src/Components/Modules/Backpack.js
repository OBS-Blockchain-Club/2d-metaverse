import { Component } from "react";

export class Backpack extends Component {

    constructor() {
        super()
        this.state={
            display: 'none',
            whenbackon: ''
        }
    }

    showbackpack(){
        if(this.state.display == 'none'){
            this.setState({display:"block", whenbackon: '400px'})
        }else{
            this.setState({display:"none", whenbackon:''})
        }
    }

    render() {
        return(
            <div className="flex justify-center items-center">
                <div className={`absolute bottom-0 w-40 h-7 rounded-t-full bg-blue-500`} style={{marginBottom:`${this.state.whenbackon}`}} onClick={()=>{this.showbackpack()}} />
                <div className="absolute bottom-0 rounded-t bg-blue-500" style={{display:`${this.state.display}`, width:"800px", height:"400px"}}></div>
            </div>
        )
    }
}