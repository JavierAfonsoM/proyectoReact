import './App.css';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import React from 'react';
import MiLista from '../components/MiLista';
import Form from '../components/Form';

class App extends React.Component {

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

  agregarIncidencia = (nuevo_titulo, nuevo_usuario, nuevo_descripcion, nuevo_categoria,
    nuevo_nivel_urgencia, nuevo_ubicacion) => {

    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0'); // meses 0-11
    const day = String(fecha.getDate()).padStart(2, '0');
    const fechaFormateada = `${year}-${month}-${day}`;

    const nuevo_id = this.state.incidencias.length + 1;
    const esDuplicado = this.state.incidencias.some(incidencia => incidencia.id_incidencia === nuevo_id);

    if (esDuplicado) {
      alert("Error: La incidencia con ID " + nuevo_id + " ya existe.");
      return;
    }

    const nuevaIncidencia = {
      id_incidencia: nuevo_id,
      id_usuario: nuevo_usuario,
      titulo: nuevo_titulo,
      descripcion: nuevo_descripcion,
      categoria: nuevo_categoria,
      nivel_urgencia: nuevo_nivel_urgencia,
      fecha_registro: fechaFormateada,
      estado: "abierto",
      ubicacion: nuevo_ubicacion


    }
    this.setState({
      incidencias: [...this.state.incidencias, nuevaIncidencia]
    });

    console.log("incidencia ", nuevaIncidencia);
  }

  render() {

    return (

      <>
        <Header />

        <div className='contenedor-incidencias'>


          <main>
            <p>Esta aplicacion muestra el contenido almacenado de mi app:</p>
            <MiLista incidencias={this.state.incidencias} />
          </main>

          <aside>
            <Form agregarIncidencia={this.agregarIncidencia} />
          </aside>

        </div>

        <Footer />

      </>
    )


  }
}

export default App;
