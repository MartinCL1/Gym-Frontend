import "./member.css";
import CardInformation from "../../../shared/cardInformation/CardInformation";
import useGet from "../../../hooks/useGet";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { Upload, X } from "lucide-react";

const MemberLayout = () => {
  const [mostrarModalPublicacion, setMostrarModalPublicacion] = useState(false);
  const { acceso, cargando, informacion } = useGet(
    "http://localhost:3500/publicaciones",
  );

  const closeModal = () => {
    setMostrarModalPublicacion(false);
  };

  const openModal = () => {
    setMostrarModalPublicacion(true);
  };

  return (
    <div className="member-wrapper">
      <div className="member-wrapper-content">
        {/* Aqui colocamos la info de las demas personas como lo que han publicado*/}
        {/* {cardData.map((data, index) => (
          
        ))} */}
        {informacion &&
          informacion.map((data) => <CardInformation data={data} />)}
      </div>
      <div className="member-opciones">
        <button onClick={openModal}>Agregar Publicacion</button>
      </div>
      <AnimatePresence>
        {mostrarModalPublicacion && (
          <ModalPublicacion cerrarModal={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

// !? Modal para mostrar en la creacion de una nueva publicacion.
//! Se debe de cambiar por un archivo unico.

const ModalPublicacion = React.memo(({ cerrarModal }) => {

  
  const subirPublicacion = () => {
    
  }

  return (
    <motion.div
      className="modal-publicacion flex-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <X className="close-modal" onClick={cerrarModal} />

      <div className="publicacion-informacion flex-center">
        {/* Contiene el titulo de la publicacion */}
        <div className="titulo-publicacion">
          <input type="text"  placeholder="Titulo..." />
        </div>
        {/* Contiene descripcion de la publicacion*/}
        <div className="descripcion-publicacion">
          <textarea  name="" id="" placeholder="Publica algo...">
          </textarea>
        </div>
        {/* Contiene imagen de la publicacion */}
        <div className="file-upload flex-center">
          <Upload className="publicacion-imagen-upload" />
          <span>Subir archivos</span>
        </div>

        <div className="opciones-publicacion">
          <button>Publicar</button>
          <button>Cancelar</button>
        </div>
      </div>
    </motion.div>
  );
});

export default MemberLayout;
