import { Component } from 'react';
import '../App.css';
import { Navbar, Nav } from 'react-bootstrap'


export class NavComponent extends Component {

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
    const navLinkCSS = `px-5 pb-2 justify-center align-bottom hover:border-opacity-100 border-b-2 border-gray-600 border-opacity-0`
    const navLinkCSSRight = `px-5 pb-2 justify-center align-bottom hover:border-opacity-100 border-b-2 border-gray-600 border-opacity-0`
    const onPageCSS = `px-5 pb-2 justify-center align-middle border-opacity-100 border-b-2 border-gray-600 border-opacity-0`

    const tabs = {
      mint: navLinkCSS, 
      map: navLinkCSS, 
      game: navLinkCSS,
      editor: navLinkCSS,
      whitepaper: navLinkCSS,
    }

    Object.keys(tabs).map((path) => {
      if(window.location.pathname.replace('/', '') == path) {
        tabs[path] = onPageCSS
        console.log(path)
      }
    })

    return (
      <div>
        <Navbar bg='none' variant="light" expand="lg" style={{backgroundColor: 'rgba(100, 150, 250, 1)', paddingBottom: '0'}}>
          <Navbar.Brand href='/' className="px-2 text-purple-800" style={{fontFamily:"ka1",filter: "drop-shadow(2px 2px 0 #000000)", fontSize:"1.1rem"}}>
            PIXEL NFT
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" style={{paddingBottom: '0'}}>
              {Object.keys(tabs).map((path, css) => (
                <Nav.Link key={path} href={`/${path}`} className={tabs[path]} style={{fontFamily:"Broken Console", fontSize:"0.9rem"}}>{path}</Nav.Link>
              ))}
            </Nav>
            <Nav className="ml-auto" style={{paddingBottom: '0'}}>
              <Nav.Link className={navLinkCSSRight} style={{fontFamily:"Broken Console", fontSize:"0.9rem"}}>{this.state.account}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}


