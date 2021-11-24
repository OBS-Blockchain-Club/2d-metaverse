import { Component } from 'react';
import './App.css';
<<<<<<< Updated upstream
import Landing from './Components/Landing';
import Game from './Components/Game';
=======
import { Routes } from './Routes';
import { BrowserRouter as Router } from "react-router-dom";
import {Landing} from './Components/Landing';

>>>>>>> Stashed changes
class App extends Component{

  async componentDidMount () {

  }

  render () {

    return (
      <div className="App">
<<<<<<< Updated upstream
        {/* <Landing/> */}
        <Game/>
=======
        <Router>
          <Routes/>
        </Router>
>>>>>>> Stashed changes
      </div>
    );
  }

}

export default App;
