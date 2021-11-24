import { BrowserRouter, Route, Switch} from "react-router-dom";
import { Landing } from "./Components/Landing";
import { Whitepaper } from "./Components/Whitepaper";

export function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Landing/>
                </Route>
                <Route path="/Whitepaper">
                    <Whitepaper/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}