import { Component } from 'react';
import './App.css';
import { Pages } from './Routes';
import { BrowserRouter as Router } from "react-router-dom";
import {Landing} from './Components/Landing';

class App extends Component{

  async componentDidMount () {

  }

  render () {

    return (
      <div className="App">
        <Router>
          <Pages/>
        </Router>
      </div>
    );
  }

}

export default App;
