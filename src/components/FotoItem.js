import React, { Component } from 'react';
import { Link } from 'react-router';
import PubSub from 'pubsub-js';

import { TOKEN_KEY } from './Login';

export const TOPIC_ATUALIZA_LIKER = 'atualiza-liker';
export const TOPIC_NOVOS_COMENTARIOS = 'novos-comentarios';

class FotoHeader extends Component {

    render() {
        const { urlPerfil, loginUsuario, horario } = this.props.foto;

        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src={urlPerfil} alt="foto do usuario"/>
                    <figcaption className="foto-usuario">
                        <Link to={`/timeline/${loginUsuario}`}>
                            {loginUsuario}
                        </Link>  
                    </figcaption>
                </figure>

                <time className="foto-data">{horario}</time>
            </header>
        );
    }
}

class FotoInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            likers : this.props.foto.likers,
            comentarios : this.props.foto.comentarios
        };
    }

    componentWillMount() {
        PubSub.subscribe(TOPIC_ATUALIZA_LIKER, (topic, infoLiker) => {
            if (this.props.foto.id === infoLiker.fotoId) {
                const possivelLiker = this.state.likers.find(liker => liker.login === infoLiker.liker.login);

                if (!possivelLiker) {
                    const novosLikers = this.state.likers.concat(infoLiker.liker);
                    this.setState({ likers : novosLikers });
                } else {
                    const novosLikers = this.state.likers.filter(liker => liker.login !== infoLiker.liker.login);
                    this.setState({ likers : novosLikers });
                }
            }
        });

        PubSub.subscribe(TOPIC_NOVOS_COMENTARIOS, (topic, infoComentario) => {
            if (this.props.foto.id === infoComentario.fotoId) {
                const novosComentarios = this.state.comentarios.concat(infoComentario.novoComentario);
                this.setState({ comentarios : novosComentarios });
            }
        });
    }

    render() {
        const { comentario } = this.props.foto;
        const { likers, comentarios } = this.state;

        return (
            <div className="foto-in fo">
                <div className="foto-info-likes">
                    {
                        likers.map(liker => <Link to={`/timeline/${liker.login}`} key={liker.login} >{liker.login}, </Link>)
                    }

                    curtiram
                </div>

                <p className="foto-info-legenda">
                    <a className="foto-info-autor">autor </a>
                    {comentario}
                </p>

                <ul className="foto-info-comentarios">
                    {
                        comentarios.map(comentario => {
                            return (
                                <li className="comentario" key={comentario.id}>
                                    <Link to={`/timeline/${comentario.login}`} className="foto-info-autor">{comentario.login} </Link>
                                    {comentario.texto}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

class FotoAtualizacoes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            likeada : this.props.foto.likeada
        };
    }

    like(event) {
        event.preventDefault();

        const authToken = localStorage.getItem(TOKEN_KEY);
        fetch(`http://localhost:8080/api/fotos/${this.props.foto.id}/like?X-AUTH-TOKEN=${authToken}`, { method : 'POST' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error('Não foi possível dar like na foto');
            })
            .then(liker => {
                this.setState({ likeada : !this.state.likeada });
                PubSub.publish(TOPIC_ATUALIZA_LIKER, {
                    liker,
                    fotoId : this.props.foto.id
                });
            });
    }

    comenta(event) {
        event.preventDefault();

        const authToken = localStorage.getItem(TOKEN_KEY);
        const requestInfo = {
            method : 'POST',
            body : JSON.stringify({ texto : this.comentario.value}),
            headers : new Headers({
                'Content-Type' : 'application/json'
            })
        };

        fetch(`http://localhost:8080/api/fotos/${this.props.foto.id}/comment?X-AUTH-TOKEN=${authToken}`, requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error('Não foi possível comentar foto');
            })
            .then(novoComentario => {
                PubSub.publish(TOPIC_NOVOS_COMENTARIOS, { fotoId : this.props.foto.id, novoComentario });
                this.comentario.value = '';
            });
    }

    render() {
        return (
            <section className="fotoAtualizacoes">
                <a onClick={this.like.bind(this)} className={this.state.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</a>
                <form className="fotoAtualizacoes-form" onSubmit={this.comenta.bind(this)}>
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comentario = input} />
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
                </form>
            </section>
        );
    }
}

export default class FotoItem extends Component {
    
    render() {
        const { foto } = this.props;

        return (
            <div className="foto">
                <FotoHeader foto={foto} />
                <img alt="foto" className="foto-src" src={foto.urlFoto} />
                <FotoInfo foto={foto} />
                <FotoAtualizacoes foto={foto} />
            </div>
        );
    }
}