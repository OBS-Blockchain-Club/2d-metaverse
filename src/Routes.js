import { Switch, Route } from "react-router-dom";
import Game from "./Components/Game";
import { Landing } from "./Components/Landing";
import { Whitepaper } from "./Components/Whitepaper";

export function Pages() {
    return(
            <Switch>
                <Route exact path="/">
                    <Landing/>
                </Route>
                <Route path="/game">
                    <Game/>
                </Route>
                <Route path="/whitepaper">
                    <Whitepaper/>
                </Route>
            </Switch>
    )
}