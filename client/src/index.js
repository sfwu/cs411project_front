import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './assets/argon/argon-dashboard-react.scss';

import RouteMainPage from './components/routeMainPage/index';
import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/argon/argon-dashboard-react.scss";


ReactDOM.render(
    <Router>
        <RouteMainPage />
    </Router>,
    document.getElementById('root')
);
