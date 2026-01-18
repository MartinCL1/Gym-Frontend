import "./components/styles.css";

const Perfil = () => {
  return (
    <section className="perfil">
      <div className="perfil-wrapper">
        <div className="perfil-banner">
          <img src="https://picsum.photos/300/300?random=9" alt="Foto de perfil" />
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

      { /** Crear un componente donde muestre la lista de amigos. */ }
      <ListaAmigos />
    </section>
  );
};

// Crear una tarjeta para cada amigo.


const ListaAmigos = () => {
  return (
    <div className="lista-amigos">
      <TarjetaAmigo />
      <TarjetaAmigo />
      <TarjetaAmigo />
      <TarjetaAmigo />
      <TarjetaAmigo />
      <TarjetaAmigo />
    </div>
  )
}


const TarjetaAmigo = () => {
  return (
    <div className="tarjeta-amigo">

    </div>
  )
}


export default Perfil;
