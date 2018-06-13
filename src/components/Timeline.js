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

    componentDidMount() {
        const authToken = localStorage.getItem(TOKEN_KEY);

        fetch(`http://localhost:8080/api/fotos?X-AUTH-TOKEN=${authToken}`)
            .then(response => response.json())
            .then(fotos => this.setState({ fotos }));
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