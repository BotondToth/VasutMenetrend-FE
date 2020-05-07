import React from "react";

import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./components/routes/MainPage";
import SearchPage from "./components/routes/SearchPage/SearchPage";
import ReportPage from "./components/routes/ReportPage/ReportPage";
import styled from "styled-components";
import LoginDialog from "./components/LoginDialog";
import RegisterDialog from "./components/RegisterDialog";
import BuyTicketDialog from "./components/BuyTicketDialog";
import UserPage from "./components/routes/UserPage/UserPage";

const NoMatch = () => <Redirect to="/" />

const PageWrapper = styled.div`{
    width: 100%;
}`;

function App() {
    localStorage.removeItem("token");
    return <PageWrapper>
        <BrowserRouter basename="/">
            <Header />
            <LoginDialog />
            <RegisterDialog />
            <BuyTicketDialog />
            <Switch>
                <Route exact path={"/report"} component={ReportPage} />
                <Route exact path={"/search"} component={SearchPage} />
                <Route exact path={"/user"} component={UserPage} />
                <Route exact path={"/"} component={MainPage} />
                <Route exact component={NoMatch} />
            </Switch>
        </BrowserRouter>
    </PageWrapper>;
}

export default App;
