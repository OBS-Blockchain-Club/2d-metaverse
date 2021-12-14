import { Switch, Route } from "react-router-dom";
import { RedirectToHome } from "./Components/RedirectToHome";
import Game from "./Pages/Game";
import { Landing } from "./Pages/Landing";
import Mint from "./Pages/Mint";
import { Navbar } from "./Pages/Navbar";
import { Whitepaper } from "./Pages/Whitepaper";

export function Pages() {
    return(
            <Switch>
                <Route exact path="/">
                    <Navbar/>
                    <Landing/>
                </Route>
                <Route path="/mint">
                    <Navbar/>
                    <Mint/>
                </Route>
                <Route exact path="/map">
                    <Navbar/>
                    
                </Route>
                <Route path="/whitepaper">
                    <Navbar/>
                    <Whitepaper/>
                </Route>
                <Route exact path="/game">
                    <Game/>
                </Route>
                <Route component={RedirectToHome} />
            </Switch>
    )
}