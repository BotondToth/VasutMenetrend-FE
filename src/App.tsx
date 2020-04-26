import React from "react";

import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./components/routes/MainPage";
import SearchPage from "./components/routes/SearchPage";
import ReportPage from "./components/routes/ReportPage/ReportPage";
import styled from "styled-components";

const NoMatch = () => <Redirect to="/" />

const PageWrapper = styled.div`{
    width: 100%;
}`;

function App() {
    return <PageWrapper>
        <BrowserRouter basename="/">
            <Header />
            <Switch>
                <Route exact path={"/report"} component={ReportPage} />
                <Route exact path={"/search"} component={SearchPage} />
                <Route exact path={"/"} component={MainPage} />
                <Route exact component={NoMatch} />
            </Switch>
        </BrowserRouter>
    </PageWrapper>;
}

export default App;
