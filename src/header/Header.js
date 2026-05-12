import React from "react";
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from "../components/Logo";

function Header({ usuario, cerrarSesion }) {
    return (
        <header id="header">

            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <Logo />
            </Link>


            {usuario && (
                <nav className="header-nav">

                    <Link to="/" className="nav-link-custom">Inicio</Link>
                    <Link to="/ver-incidencias" className="nav-link-custom">Ver Incidencias</Link>
                    <Link to="/registrar-incidencia" className="nav-link-custom">Registrar</Link>


                    {usuario.rol?.nombre_rol === "admin" && (
                        <Link to="/gestion-usuarios" className="nav-link-custom admin-link">Usuarios</Link>
                    )}

                    <button className="btn-logout" onClick={cerrarSesion}>
                        Cerrar Sesión
                    </button>
                </nav>
            )}
        </header>
    );
}

export default Header;