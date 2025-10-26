import './App.css';
import MiLista from '../MiLista';
import Footer from '../footer/Footer';
import Header from '../header/Header';

function App() {
  return (
    <>
      <Header />

      <h2>Mi aplicacion</h2>
      <div id="parrafo">
        <p>Esta aplicacion muestra el contenido almacenado de mi app:</p>
      </div>
      <MiLista />
      <Footer />
    </>
  );
}




export default App;
