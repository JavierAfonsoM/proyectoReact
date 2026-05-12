import React from 'react';

// Este componente renderiza el logo directamente como código SVG
function Logo() {
    return (
        <div className="logo-completo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* ICONO SVG: Un escudo con una marca de verificación (Gear/Checkmark concept) */}
            <svg
                width="40"
                height="40"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ flexShrink: 0 }}
            >
                {/* Fondo del escudo */}
                <path
                    d="M50 5L90 25V65C90 85 50 95 50 95C50 95 10 85 10 65V25L50 5Z"
                    fill="#007f65" /* Tu color verde */
                    stroke="#005f4b" /* Un verde un poco más oscuro para el borde */
                    strokeWidth="4"
                />
                {/* Marca de verificación/Resolución interior */}
                <path
                    d="M30 50L45 65L70 35"
                    stroke="white"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            {/* TEXTO CORPORATIVO */}
            <div className="logo-texto" style={{ display: 'flex', flexDirection: 'column', color: 'white' }}>
                <span style={{
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    lineHeight: '1.1',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    Gestión de
                </span>
                <span style={{
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    lineHeight: '1.1',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    Incidencias
                </span>
                <span style={{
                    fontSize: '0.8rem',
                    opacity: '0.8',
                    marginTop: '2px',
                    textTransform: 'uppercase'
                }}>
                    Centro Educativo
                </span>
            </div>
        </div>
    );
}

export default Logo;