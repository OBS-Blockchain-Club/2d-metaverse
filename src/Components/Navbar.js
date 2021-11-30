import { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


export class Navbar extends Component {

  constructor() {
    super()
    this.state = {
      account: ''
    }
  }

  async componentDidMount() {
    try {
      if(window.ethereum) {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
        this.setState({account: accounts[0]})
      }
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    const navLinkCSS = `px-5 pb-2 justify-center align-middle hover:border-opacity-100 border-b-2 border-gray-600 border-opacity-0`
    const navLinkCSSRight = `px-5 pb-2 justify-center align-middle hover:border-opacity-100 border-b-2 border-gray-600 border-opacity-0`
    const onPageCSS = `px-5 pb-2 justify-center align-middle border-opacity-100 border-b-2 border-gray-600 border-opacity-0`

    const tabs = {
      mint: navLinkCSS, 
      map: navLinkCSS, 
      game: navLinkCSS, 
      whitepaper: navLinkCSS,
    }

    Object.keys(tabs).map((path) => {
      if(window.location.pathname.replace('/', '') == path) {
        tabs[path] = onPageCSS
      }
    })

    return (
      <div>
          <div className="fixed w-screen bg-blue-300">
              <div className="flex justify-between py-0">
                <div className='flex items-end'>
                  <div className="px-2 text-purple-800 align-bottom" style={{fontFamily:"Broken Console",filter: "drop-shadow(2px 2px 0 #000000)", fontSize:"2rem"}}>
                    <Link to="/">PIXEL NFT</Link>
                  </div>
                  {Object.keys(tabs).map((path, css) => (
                    <Link key={path} to={`/${path}`} className={tabs[path]} style={{fontFamily:"Broken Console", fontSize:"0.9rem"}}>{path}</Link>
                  ))}
                </div>
                <div className='flex items-end'>
                  <Link className={navLinkCSSRight} style={{fontFamily:"Broken Console", fontSize:"0.9rem"}}>{this.state.account}</Link>
                </div>
              </div>
          </div>
      </div>
    );
  }
}


