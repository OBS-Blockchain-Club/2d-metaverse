import { Component } from 'react';
import './App.css';
import { Pages } from './Routes';
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component{

  render () {

    return (
      <div className="App min-h-screen bg-gray-900">
        <Router>
          <Pages/>
        </Router>
      </div>
    );
  }

}

export default App;
