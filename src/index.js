import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,browserHistory} from 'react-router';

import App from './App';
import Login from './components/Login';

import './css/reset.css';
import './css/timeline.css';
import './css/login.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    (
        <Router history={browserHistory}>
            <Route path="/" component={Login} />
            <Route path="/timeline" component={App} />
        </Router>
    ),
    document.getElementById('root')
);
registerServiceWorker();
