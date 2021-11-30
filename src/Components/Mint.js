import { Component } from "react";
import Web3 from "web3";

export default class Mint extends Component {

    constructor() {
        super()
        this.state = {
            web3: new Web3(window.ethereum)
        }
    }

    render() {
        return(
            <div>
                hello
            </div>
        )
    }

}