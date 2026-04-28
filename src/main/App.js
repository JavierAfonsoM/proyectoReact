import './App.css';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { useEffect, useState } from 'react';
import MiLista from '../components/MiLista';
import Form from '../components/Form';
import Login from '../components/Login';


function App() {

  const INCIDENCIA_API_URL = 'http://localhost:3004/incidencias';
  const USUARIO_API_URL = 'http://localhost:3004/users';
  const USUARIO_LOGIN_URL = 'http://localhost:3004/login';


  const [usuarios, setUsuario] = useState([]);
  const [incidencias, setIncidencias] = useState([])
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);


  // carga al renderizado inicial
  //  incidencias desde json-server
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
    // comprobar usuario logeado



    obtenerIncidencias();
    obtenerUsuarios();

  }, []);

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
      setUsuarioLogueado(userData);

    } else {
      const errorData = await response.json();
      alert(`Fallo de autenticación. Error: ${response.status}: ${errorData} `);
    }

  };





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





  return (

    <>
      <Header />

      <div className='contenedor-incidencias'>
        {usuarioLogueado ? (

          <>
            <main>
              <MiLista incidencias={incidencias} />
            </main>

            <aside>
              <Form agregarIncidencia={agregarIncidencia} />
            </aside>
          </>



        ) : (
          <Login inicioSesion={inicioSesion} />
        )}
      </div>

      <Footer />

    </>
  )


}


export default App;
