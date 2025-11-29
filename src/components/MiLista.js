

function MiLista(props) {

    return (
        <div>
            <ul>
                {props.incidencias.map((i) =>
                (
                    < li key={i.id_incidencia} >
                        <dt> <strong>    Titulo:        </strong> {i.titulo}          </dt>
                        <dd> <strong>    ID:            </strong> {i.id_incidencia}   </dd>
                        <dd> <strong>    Descripcion:   </strong> {i.descripcion}     </dd>
                        <dd> <strong>    Usuario:       </strong> {i.id_usuario}      </dd>
                        <dd> <strong>    Urgencia:      </strong> {i.nivel_urgencia}  </dd>
                        <dd> <strong>    Ubicacion:     </strong> {i.ubicacion}       </dd>
                        <dd> <strong>    Fecha:         </strong> {i.fecha_registro}  </dd>
                        <br />
                    </li>
                ))}
            </ul >
        </div>
    )


};

export default MiLista;