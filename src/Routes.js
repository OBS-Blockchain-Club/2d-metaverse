import { Switch, Route } from "react-router-dom";
import { RedirectToHome } from "./Components/RedirectToHome";
import Game from "./Pages/Game";
import { Landing } from "./Pages/Landing";
import Mint from "./Pages/Mint";
import { NavComponent } from "./Pages/Navbar";
import { Whitepaper } from "./Pages/Whitepaper";

export function Pages() {
    return(
            <Switch>
                <Route exact path="/">
                    <NavComponent/>
                    <Landing/>
                </Route>
                <Route path="/mint">
                    <NavComponent/>
                    <Mint/>
                </Route>
                <Route exact path="/map">
                    <NavComponent/>
                    
                </Route>
                <Route path="/whitepaper">
                    <NavComponent/>
                    <Whitepaper/>
                </Route>
                <Route exact path="/game">
                    <Game/>
                </Route>
                <Route component={RedirectToHome} />
            </Switch>
    )
}