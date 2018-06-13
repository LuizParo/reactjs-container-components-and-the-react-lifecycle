import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,browserHistory} from 'react-router';

import App from './App';
import Login, { TOKEN_KEY } from './components/Login';
import Logout from './components/Logout';

import './css/reset.css';
import './css/timeline.css';
import './css/login.css';

import registerServiceWorker from './registerServiceWorker';

function verificaAutenticacao(nextState, replace) {
    if (localStorage.getItem(TOKEN_KEY) === null) {
        const mensagem = 'Você precisa estar logado para acessar este endereço';
        replace(`/?mensagem=${mensagem}`);
    }
}

ReactDOM.render(
    (
        <Router history={browserHistory}>
            <Route path="/" component={Login} />
            <Route path="/timeline" component={App} onEnter={verificaAutenticacao} />
            <Route path="/logout" component={Logout} />
        </Router>
    ),
    document.getElementById('root')
);
registerServiceWorker();
