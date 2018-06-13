import React, { Component } from 'react';
import { Link } from 'react-router';

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

    render() {
        const { likers, comentario, comentarios } = this.props.foto;

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

    render() {
        return (
            <section className="fotoAtualizacoes">
                <Link className="fotoAtualizacoes-like">Likar</Link>
                <form className="fotoAtualizacoes-form">
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
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
                <FotoAtualizacoes />
            </div>
        );
    }
}