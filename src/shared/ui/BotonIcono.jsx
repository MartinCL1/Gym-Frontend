import { useState } from 'react';
import '../share.ui.css';

const BotonIcono = ({ Icono, text, accionBoton, estilos }) => {
  const [clase, setClase] = useState("");

  const cambiarClase = () => {
    if(clase === "") {
        setClase(estilos);
    } else {
        setClase("");
    }
    accionBoton()
  }

  return (
    <div className="flex-center" style={{cursor: "pointer"}} onClick={cambiarClase} >
      <Icono className={clase} />
      { text && <span style={{userSelect: "none"}}>{text}</span>}
    </div>
  );
};

export default BotonIcono;
