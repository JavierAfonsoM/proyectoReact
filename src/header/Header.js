import React from "react";
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <div id="header">
                <h3>
                    Gestión de Incidencias
                </h3>

                {this.props.usuario && (
                    <button className="btn-logout" onClick={this.props.cerrarSesion}>
                        Cerrar Sesión
                    </button>
                )}
            </div>
        );
    }
}
export default Header;