import { Switch, Route } from "react-router-dom";
import { Landing } from "./Components/Landing";
import { Whitepaper } from "./Components/Whitepaper";

export function Pages() {
    return(
            <Switch>
                <Route exact path="/">
                    <Landing/>
                </Route>
                <Route path="/Whitepaper">
                    <Whitepaper/>
                </Route>
            </Switch>
    )
}