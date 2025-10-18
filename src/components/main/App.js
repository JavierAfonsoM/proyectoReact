import './App.css';
import MiLista from '../../MiLista';
function App() {
  return (
    <>
      <h1>Hola mundo</h1>
      <h2>Este es mi primer componente React</h2>
      <div className="parrafo">
        <p>Bienvenido a mi aplicacion,esto fue creado con JavaScript en React</p>
      </div>
      <br></br>
      <MiLista titulo="Clientes" nombre1="paco" nombre2="ana" nombre3="jose"></MiLista>
      <br></br>
      <MiLista titulo="Amigos" nombre1="antonio" nombre2="maria" nombre3="abel" ></MiLista>
      <br></br>
      <MiLista titulo="Familiares" nombre1="momo" nombre2="lucia" nombre3="isabel" ></MiLista>
    </>
  );
}




export default App;
