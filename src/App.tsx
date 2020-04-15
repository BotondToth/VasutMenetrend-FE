import React from "react";

import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import MainPage from "./redux/routes/MainPage";

const NoMatch = () => <Redirect to="/" />

function App() {
    return <BrowserRouter basename="/">
        <Switch>
            <Route exact path={"/"} component={MainPage} />
            <Route exact component={NoMatch} />
        </Switch>
    </BrowserRouter>;
}

export default App;
