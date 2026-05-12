import './Form.css';

function Form(props) {

    const envioFormulario = (evento) => {
        evento.preventDefault();
        const form = evento.target;
        props.agregarIncidencia(
            form.titulo.value,
            props.usuario.email,
            form.descripcion.value,
            form.categoria.value,
            form.nivel.value,
            form.ubicacion.value
        );

        form.reset();
    }


    return (
        <div className="form-container">

            <h2>Registrar Nueva Incidencia</h2>
            <form onSubmit={envioFormulario}>

                {/* titulo incidencia */}
                <div className="elemento-form">
                    <label>Titulo</label>
                    <input type="text" name="titulo" placeholder="Introduce el titulo" required />
                    <br />
                </div>


                {/* descripcion incidencias */}
                <div className="elemento-form">
                    <label>Descripcion</label>
                    <textarea name="descripcion" required />
                    <br />
                </div>

                {/* Categoria */}
                <div className="elemento-form">
                    <label>Categoria</label>
                    <select name="categoria" required>
                        <option value="">--Selecciona una categoria--</option>
                        <option>Hardware</option>
                        <option>Conectividad</option>
                        <option>Usuario</option>
                        <option>Infraestructura</option>
                    </select>
                    <br />
                </div>

                {/* Urgencia */}
                <div className="elemento-form">
                    <label>Nivel de urgencia</label>
                    <select name="nivel" required>
                        <option value="">--Selecciona nivel de urgencia--</option>
                        <option>Alto</option>
                        <option>Medio</option>
                        <option>Bajo</option>
                    </select>
                    <br />
                </div>

                {/* Ubicacion */}
                <div className="elemento-form">
                    <label>Ubicacion</label>
                    <input type="text" name="ubicacion" placeholder="Ej: B205" required />
                    <br />
                </div>

                {/* Boton enviar */}
                <button type="submit" className="elemento-form-button">Registrar incidencia</button>



            </form>
        </div>
    )

}
export default Form