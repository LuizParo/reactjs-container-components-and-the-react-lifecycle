import React, { Component } from 'react';

import FotoItem from './FotoItem';
import { TOKEN_KEY } from './Login';

export default class Timeline extends Component {

    constructor() {
        super();

        this.state = {
            fotos : []
        };
    }

    carregaFotos(login) {
        let urlPerfil = 'http://localhost:8080/api';
        
        if (!login) {
            const authToken = localStorage.getItem(TOKEN_KEY);
            urlPerfil += `/fotos?X-AUTH-TOKEN=${authToken}`;
        } else {
            urlPerfil += `/public/fotos/${login}`;
        }
    
        fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => this.setState({ fotos }));
    }

    componentDidMount() {
        this.carregaFotos(this.props.login);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.login) {
            this.carregaFotos(nextProps.login);
        }
    }

    render() {
        return (
            <div className="fotos container">
                {
                    this.state.fotos.map(foto => <FotoItem foto={foto} key={foto.id} />)
                }
            </div>
        );
    }
}