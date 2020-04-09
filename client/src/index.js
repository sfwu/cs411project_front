import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import RouteMainPage from './components/routeMainPage/index'


ReactDOM.render(
    <Router>
        <RouteMainPage />
    </Router>,
    document.getElementById('root')
);
