import { Switch, Route } from "react-router-dom";
import Game from "./Components/Game";
import { Landing } from "./Components/Landing";
import { Navbar } from "./Components/Navbar";
import { Whitepaper } from "./Components/Whitepaper";

export function Pages() {
    return(
            <Switch>
                <Route exact path="/">
                    <Navbar/>
                    <Landing/>
                </Route>
                <Route path="/whitepaper">
                    <Navbar/>
                    <Whitepaper/>
                </Route>
                <Route path="/game">
                    <Game/>
                </Route>
            </Switch>
    )
}