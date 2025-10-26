import React from "react";

class MiLista extends React.Component {

    state = {
        incidencias: [
            {
                id_incidencia: 1,
                id_usuario: 'u1234',
                titulo: "proyector averiado en aula 2",
                descripcion: "El proyector del aula 2 no enciende y no muestra imagen.",
                categoria: "Hardware",
                nivel_urgencia: "Alto",
                fecha_registro: "2024-06-15",
                estado: "Abierto",
                ubicacion: "A301"
            },
            {
                id_incidencia: 2,
                id_usuario: 'u5678',
                titulo: "ordenador de secretaria no enciende",
                descripcion: "El ordenador de la secretaria no arranca al pulsar el botón de encendido.",
                categoria: "Hardware",
                nivel_urgencia: "Medio",
                fecha_registro: "2024-06-14",
                estado: "En progreso",
                ubicacion: "Secretaria"
            },
            {
                id_incidencia: 3,
                id_usuario: 'u9101',
                titulo: "impresora sin conexion",
                descripcion: "La impresora del departamento no se conecta a la red.",
                categoria: "Red",
                nivel_urgencia: "Bajo",
                fecha_registro: "2024-06-13",
                estado: "Cerrado",
                ubicacion: "Departamento de Matematicas"
            },
            {
                id_incidencia: 4,
                id_usuario: 'u1121',
                titulo: "pantalla tactil no responde",
                descripcion: "No responde la pantalla.",
                categoria: "Hardware",
                nivel_urgencia: "Alto",
                fecha_registro: "2024-06-12",
                estado: "Abierto",
                ubicacion: "Biblioteca"
            },
            {
                id_incidencia: 5,
                id_usuario: 'u3141',
                titulo: "altavoces sin sonido",
                descripcion: "Los altavoces del aula de musica no emiten sonido.",
                categoria: "Hardware",
                nivel_urgencia: "Medio",
                fecha_registro: "2024-06-11",
                estado: "En progreso",
                ubicacion: "Aula de Musica"
            }


        ]
    };



    render() {
        return (
            <ul>
                {this.state.incidencias.map((i) =>
                (
                    < li key={i.id_incidencia} >
                        <strong>    Titulo:        </strong> {i.titulo}            <br />
                        <strong>    Descripcion:   </strong> {i.descripcion}       <br />
                        <strong>    Usuario:       </strong> {i.id_usuario}        <br />
                        <strong>    Urgencia:      </strong> {i.nivel_urgencia}    <br />
                        <strong>    Ubicacion:     </strong> {i.ubicacion}         <br /> <br />
                    </li>
                ))}
            </ul >
        )
    }

};

export default MiLista;