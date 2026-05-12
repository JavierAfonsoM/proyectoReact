import { Link } from 'react-router-dom';

function Menu({ usuario, cerrarSesion }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <span className="navbar-brand">Menú</span>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/ver-incidencias">Ver Incidencias</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/registrar-incidencia">Registrar Incidencia</Link>
                        </li>
                        {/* si es admin */}
                        {usuario?.rol === "administrador" && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/gestion-usuarios">Gestión Usuarios</Link>
                            </li>
                        )}
                        {/* boton cerrar sesion */}
                        <li className="nav-item">
                            <button className="btn nav-link" onClick={cerrarSesion}>Cerrar Sesión</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Menu;