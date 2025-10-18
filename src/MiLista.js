function MiLista(props) {

    return (
        <div>
            <h4>Mi lista de {props.titulo}:</h4>
            <ul>
                <li>{props.nombre1}</li>
                <li>{props.nombre2}</li>
                <li>{props.nombre3}</li>
                <li>marta</li>
            </ul>

        </div>
    );

};
export default MiLista;