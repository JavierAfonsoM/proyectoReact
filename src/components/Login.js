import './Login.css';

function Login(props) {
    const sendFormLogin = (event) => {
        event.preventDefault();
        let form = event.target;
        props.inicioSesion(form.email.value, form.password.value);
    }

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={sendFormLogin}>
                <div className="elemento-form">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="usuario@dominio.com" required />
                </div>

                <div className="elemento-form">
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" placeholder="contraseña" required />
                </div>

                <button type="submit" className="elemento-form-button">Iniciar sesión</button>
            </form>
        </div>
    );
}

export default Login;