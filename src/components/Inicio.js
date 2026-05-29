import React from 'react';
import { Link } from 'react-router-dom';
import './Inicio.css';

function Inicio({ incidencias, usuario }) {

    const totales = incidencias.length;
    const abiertas = incidencias.filter(i => i.estado !== "Cerrada").length;
    const cerradas = incidencias.filter(i => i.estado === "Cerrada").length;


    const recientes = [...incidencias].reverse().slice(0, 3);

    return (
        <div className="inicio-container">
            <div className="bienvenida-card">
                <h1>Bienvenido, {(usuario?.nombre || 'Usuario').toUpperCase()} </h1>
                <p>Bienvenido al sistema de gestión de incidencias</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card total">
                    <h3>{totales}</h3>
                    <p>Incidencias Totales</p>
                </div>
                <div className="stat-card pendientes">
                    <h3>{abiertas}</h3>
                    <p>Pendientes / Abiertas</p>
                </div>
                <div className="stat-card completadas">
                    <h3>{cerradas}</h3>
                    <p>Cerradas</p>
                </div>
            </div>


        </div>
    );
}

export default Inicio;