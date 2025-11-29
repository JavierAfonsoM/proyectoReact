import './MiLista.css';

function MiLista(props) {

    return (
        <div>
            <table className="tablaLista">
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>ID</th>
                        <th>Descripcion</th>
                        <th>Usuario</th>
                        <th>Urgencia</th>
                        <th>Ubicacion</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {props.incidencias.map((i) => (
                        <tr key={i.id_incidencia}>
                            <td>{i.titulo}</td>
                            <td>{i.id_incidencia}</td>
                            <td>{i.descripcion}</td>
                            <td>{i.id_usuario}</td>
                            <td>{i.nivel_urgencia}</td>
                            <td>{i.ubicacion}</td>
                            <td>{i.fecha_registro}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )


};

export default MiLista;