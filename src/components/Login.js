import React, { Component } from 'react';

export default class Login extends Component {

    constructor() {
        super();

        this.state = {
            mensagem : ''
        };

        this.envia = this.envia.bind(this);
    }

    envia(event) {
        event.preventDefault();

        const requestInfo = {
            method : 'POST',
            body : JSON.stringify({
                login : this.login.value,
                senha : this.senha.value
            }),
            headers : new Headers({
                'Content-type' : 'application/json'
            })
        };

        fetch('http://localhost:8080/api/public/login', requestInfo)
            .then(responde => {
                if (responde.ok) {
                    return responde.text();
                }

                this.setState({ mensagem : 'Não foi possível fazer o login' });
            })
            .then(token => console.log(token));
    }

    render() {
        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.mensagem}</span>

                <form onSubmit={this.envia}>
                    <input type="text" ref={input => this.login = input} />
                    <input type="password" ref={input => this.senha = input} />
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
}