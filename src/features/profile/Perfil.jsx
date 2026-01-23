import DashboardAdmin from "./components/DashboardAdmin";
import "./components/styles.css";

const amigos = [
  { username: "Martin Cox", cantidadAmigos: 245, foto: `https://picsum.photos/300/300?random=${Math.random()}` },
  { username: "Sarah Johnson", cantidadAmigos: 189, foto: `https://picsum.photos/300/300?random=${Math.random()}` },
  // { username: "Alex Rivera", cantidadAmigos: 312, foto: `https://picsum.photos/300/300?random=${Math.random()}` },
  // { username: "Emma Davis", cantidadAmigos: 156, foto: `https://picsum.photos/300/300?random=${Math.random()}` },
  // { username: "Lucas Brown", cantidadAmigos: 201, foto: `https://picsum.photos/300/300?random=${Math.random()}` },
  // { username: "Sofia Lemus", cantidadAmigos: 278, foto: `https://picsum.photos/300/300?random=${Math.random()}` },
];

const Perfil = () => {
  return (
    <section className="perfil">
      <div className="perfil-wrapper">
        <div className="perfil-banner">
          <img
            src="https://picsum.photos/300/300?random=9"
            alt="Foto de perfil"
          />
          <div className="perfil-banner-informacion">
            <div>
              <h2>Martin Cox</h2>
              <p>Explorador urbano y amante de la fotografía</p>
              <button className="membresia-usuario">Ver Membresia</button>
            </div>
            <div className="opciones">
              <button>Editar Perfil</button>
              <button>Cambiar Foto Perfil</button>
            </div>
          </div>
        </div>
      </div>

      {/** Crear un componente donde muestre la lista de amigos. */}
      <ListaAmigos />
      <Dashboard /> 
    </section>
  );
};

// Dashboard 

const Dashboard = () => {
  return (
    <div className="dashboard" >
      <div className="dashboard-container">
        <h2>Asistencia</h2>
        <DashboardAdmin />
      </div>
    </div>
  )
}

// Crear una tarjeta para cada amigo.

const ListaAmigos = () => {
  return (
    <div className="lista-amigos">
      <h2>Comunidad</h2>
      {
        amigos.map((amigo) => (
          <TarjetaAmigo amigoInfo={amigo} />
        ))
      }

      <button className="mas-amigos flex-center">
        <h2>Mostrar mas amigos</h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right-icon lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
      </button>
    </div>
  );
};

const TarjetaAmigo = ({ amigoInfo }) => {
  return (
    <div className="tarjeta-amigo">
      <img src={amigoInfo.foto} alt="" />
      <div className="tarjeta-amigo-descripcion">
        <>
          <h3>{amigoInfo.username}</h3>
          <br />
          <p>Amigos {amigoInfo.cantidadAmigos}</p>
        </>
        <div className="opciones opciones-tarjeta-amigo">
          <button>Eliminar</button>
          <button>Enviar Mensaje</button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
