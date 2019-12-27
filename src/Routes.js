import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewAccount from "./containers/NewAccount";
import Accounts from "./containers/Accounts";
import NotFound from "./containers/NotFound";

export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={Home} appProps={appProps} />
            <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
            <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
            <AppliedRoute path="/accounts/new" exact component={NewAccount} appProps={appProps} />
            <AppliedRoute path="/accounts/:id" exact component={Accounts} appProps={appProps} />
            { /* Finally, catch all unmatched routes */}
            <Route component={NotFound} />
        </Switch>
    );
}