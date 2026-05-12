import './App.css';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { useEffect, useState } from 'react';
import MiLista from '../components/MiLista';
import Form from '../components/Form';
import Login from '../components/Login';
import { jwtDecode } from 'jwt-decode';
import Menu from '../components/Menu';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserRoleManagement from '../components/UserRoleManagment';
import Inicio from '../components/Inicio';

function App() {

  const INCIDENCIA_API_URL = 'http://localhost:3004/incidencias';
  const USUARIO_API_URL = 'http://localhost:3004/users';
  const USUARIO_LOGIN_URL = 'http://localhost:3004/login';


  const [usuarios, setUsuario] = useState([]);
  const [incidencias, setIncidencias] = useState([])
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);


  // carga al renderizado inicial

  useEffect(() => {
    //carga de incidencias
    const obtenerIncidencias = async () => {
      try {
        let respuesta = await fetch(INCIDENCIA_API_URL);
        if (!respuesta.ok) {
          throw new Error('Error al obtener las incidencias');
        }
        const datos = await respuesta.json();
        console.log('Incidencias obtenidas:', datos);
        setIncidencias(datos);
      } catch (error) {
        console.error('Error fetching incidencias:', error);
      }
    }

    //carga de usuarios
    const obtenerUsuarios = async () => {
      try {
        let respuesta = await fetch(USUARIO_API_URL);
        if (!respuesta.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        const datos = await respuesta.json();
        console.log('Usuarios obtenidos:', datos);
        setUsuario(datos);
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    }

    obtenerIncidencias();
    obtenerUsuarios();
  }, []);
  //-------------------------------------------------------------

  // carga de usuario logeado 
  //  incidencias desde json-server
  useEffect(() => {


    // obtener usuario logeado
    const obtenerUsuarioLogeado = () => {

      const savedUser = localStorage.getItem('authToken');

      if (savedUser && savedUser !== 'undefined') {

        const decodedUser = jwtDecode(localStorage.getItem('authToken'));
        console.log('Usuario logueado:', decodedUser);
        if (decodedUser) {
          const user = usuarios.find((u) => u.email === decodedUser.email);
          user ? setUsuarioLogueado(user) : setUsuarioLogueado(null);
        }
      }
    };

    obtenerUsuarioLogeado();


  }, [usuarios]);

  // funcion de inicio de sesion

  const inicioSesion = async (email, password) => {

    const response = await fetch(USUARIO_LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "email": email, "password": password }),
    });

    if (response.ok) {
      const userData = await response.json();

      localStorage.setItem('authToken', userData["accessToken"]);

      setUsuarioLogueado(userData.user);

    } else {
      const errorData = await response.json();
      alert(`Fallo de autenticación. Error: ${response.status}: ${errorData} `);
    }

  };

  const cerrarSesion = () => {

    localStorage.removeItem('authToken');


    setUsuarioLogueado(null);
  };

  //--------------------------------------------------------------------------------------------



  // agregar incidencias
  const agregarIncidencia = async (nuevo_titulo, nuevo_usuario, nuevo_descripcion, nuevo_categoria,
    nuevo_nivel_urgencia, nuevo_ubicacion) => {
    try {
      //formateo fecha
      const fecha = new Date();
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth() + 1).padStart(2, '0'); // meses 0-11
      const day = String(fecha.getDate()).padStart(2, '0');
      const fechaFormateada = `${year}-${month}-${day}`;

      // verificacion ID unico
      const nuevo_id = incidencias.length + 1;
      const esDuplicado = incidencias.some(incidencia => incidencia.id_incidencia === nuevo_id);
      // manejo de error ID duplicado
      if (esDuplicado) {
        alert("Error: La incidencia con ID " + nuevo_id + " ya existe.");
        return;
      }

      // busqueda usuario existente
      let usuarioEncontrado = usuarios.find(user => user.email === nuevo_usuario);

      if (usuarioEncontrado) {

        // nueva incidencia que se agrega al estado
        const nuevaIncidencia = {
          id: nuevo_id,
          usuario: usuarioEncontrado,
          titulo: nuevo_titulo,
          descripcion: nuevo_descripcion,
          categoria: nuevo_categoria,
          nivel_urgencia: nuevo_nivel_urgencia,
          fecha_registro: fechaFormateada,
          ubicacion: nuevo_ubicacion,
          estado: "Abierta",
          comentarios: []
        }
        // peticion POST al servidor
        let respuesta = await fetch(INCIDENCIA_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nuevaIncidencia)
        });

        // manejo de error peticion
        if (!respuesta.ok) {
          throw new Error('fallo en la peticion post. estado HTTP: ' + respuesta.status);
        }
        let datoRespuesta = await respuesta.json();
        console.log("Respuesta del servidor:", datoRespuesta);

        // insercion de la nueva incidencia
        setIncidencias([...incidencias, nuevaIncidencia]);
        alert("Incidencia registrada con exito");

      } else {
        alert("no se puede crear la incidencia. El usuario con email " + nuevo_usuario + " no existe.");
        throw new Error("Usuario no encontrado");
      }

    } catch (error) {
      console.error('Error al agregar la incidencia:', error);
    }
  };

  // funcion para cerrar una incidencia (solo admin)

  const cerrarIncidencia = async (id) => {
    try {
      const respuesta = await fetch(`${INCIDENCIA_API_URL}/${id}`, {
        method: 'PATCH', // Modificación parcial [cite: 132]
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: "Cerrada" })
      });

      if (respuesta.ok) {
        // Actualizamos el estado local para que se vea el cambio
        setIncidencias(incidencias.map(inc => inc.id === id ? { ...inc, estado: "Cerrada" } : inc));
        alert("Incidencia cerrada correctamente");
      }
    } catch (error) {
      console.error("Error al cerrar incidencia:", error);
    }
  };



  //--------------------------------------------------------------------------------------------
  // Renderizado de la aplicacion web
  return (
    <>
      {/* El Header ahora contiene la navegación interna */}
      <Header cerrarSesion={cerrarSesion} usuario={usuarioLogueado} />

      <div className='contenedor-incidencias'>
        {!usuarioLogueado ? (
          <Login inicioSesion={inicioSesion} />
        ) : (
          <Routes>
            <Route path="/" element={<Inicio incidencias={incidencias} usuario={usuarioLogueado} />} />

            <Route path="/ver-incidencias" element={
              <main>
                <MiLista
                  incidencias={incidencias}
                  usuario={usuarioLogueado}
                  cerrarIncidencia={cerrarIncidencia}
                />
              </main>
            } />

            <Route path="/registrar-incidencia" element={
              <aside>
                <Form agregarIncidencia={agregarIncidencia}
                  usuario={usuarioLogueado} />
              </aside>
            } />

            <Route path="/gestion-usuarios" element={
              usuarioLogueado?.rol?.nombre_rol === "admin" ?
                <UserRoleManagement usuarios={usuarios} setUsuarios={setUsuario} /> :
                <Navigate to="/" />
            } />

          </Routes>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
