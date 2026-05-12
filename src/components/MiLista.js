import './MiLista.css';

function MiLista(props) {

    return (
        <div>

            <h2>Lista de Incidencias</h2>
            <table className="tablaLista">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titulo</th>
                        <th>Descripcion</th>
                        <th>Usuario</th>
                        <th>Urgencia</th>
                        <th>Ubicacion</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        {/* el encabezado solo existe para admins */}
                        {props.usuario?.rol?.nombre_rol === "admin" && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {props.incidencias.map((i) => (
                        <tr key={i.id}>
                            <td>{i.id}</td>
                            <td>{i.titulo}</td>
                            <td>{i.descripcion}</td>
                            <td>{i.usuario?.email || 'Sin usuario'}</td>
                            <td>{i.nivel_urgencia}</td>
                            <td>{i.ubicacion}</td>
                            <td>{i.estado}</td>
                            <td>{i.fecha_registro}</td>

                            {/* solo se muestra para admin */}
                            {props.usuario?.rol?.nombre_rol === "admin" && (
                                <td>
                                    {i.estado !== "Cerrada" ? (
                                        <button
                                            className="btn-cerrar"
                                            onClick={() => props.cerrarIncidencia(i.id)}
                                        >
                                            Cerrar
                                        </button>
                                    ) : (
                                        <span>-</span>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
};

export default MiLista;