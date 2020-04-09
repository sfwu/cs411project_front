import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import MainPage from "../../App";
import history from '../history/history';
import Register from '../../pages/registration/index'

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={MainPage} />
                    <Route path="/registration" component={Register} />
                </Switch>
            </Router>
        )
    }
}