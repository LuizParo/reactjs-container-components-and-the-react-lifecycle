import React, { Component } from 'react';

class FotoHeader extends Component {

    render() {
        const { urlPerfil, loginUsuario, horario } = this.props.foto;

        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src={urlPerfil} alt="foto do usuario"/>
                    <figcaption className="foto-usuario">
                        <a href="#">
                            {loginUsuario}
                        </a>  
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
                        likers.map(liker => <a href="#" key={liker.login} >{liker.login}, </a>)
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
                                    <a className="foto-info-autor">{comentario.login} </a>
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
                <a href="#" className="fotoAtualizacoes-like">Likar</a>
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