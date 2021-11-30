import { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


export function Navbar (){

    const navLinkCSS = `px-5 pb-2 inline-block align-middle hover:border-opacity-100 border-b-2 border-gray-600 border-opacity-0`
    const onPageCSS = `px-5 pb-2 inline-block align-middle border-opacity-100 border-b-2 border-gray-600 border-opacity-0`

    const tabs = {
      mint: navLinkCSS, 
      map: navLinkCSS, 
      game: navLinkCSS, 
      whitepaper: navLinkCSS
    }

    Object.keys(tabs).map((path) => {
      if(window.location.pathname.replace('/', '') == path) {
        tabs[path] = onPageCSS
      }
    })

    return (
                //The color for the navbar is only temporary, change it according to what u want
      <div>

          <div className="fixed w-screen bg-blue-300">
            <div className="text-left py-0 align-middle">
              <div className="inline-block px-2 text-purple-800 align-bottom" style={{fontFamily:"Broken Console",filter: "drop-shadow(2px 2px 0 #000000)", fontSize:"2rem"}}>
                <Link to="/">PIXEL NFT</Link>
              </div>
              {Object.keys(tabs).map((path, css) => (
                <Link key={path} to={`/${path}`} className={tabs[path]} style={{fontFamily:"Broken Console", fontSize:"0.9rem"}}>{path}</Link>
              ))}
            </div>
          </div>
      </div>
    );

}


