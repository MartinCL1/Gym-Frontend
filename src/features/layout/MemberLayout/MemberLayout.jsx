import "./member.css";
import CardInformation from "../../../shared/cardInformation/CardInformation";
import useGet from "../../../hooks/useGet";
import { useEffect, useRef, useState } from "react";
import { usePost } from "../../../hooks/usePost";
import { Dialog } from "radix-ui";
import { AnimatePresence, motion } from 'motion/react'
import { Upload } from "lucide-react";


const MemberLayout = () => {
  const [mostrarModalPublicacion, setMostrarModalPublicacion] = useState(false);
  const { cargando:postCargando, respuesta, enviarPeticion } = usePost(false);
  const [visibilidadToast, setVisibilidadToast] = useState(false)

  useEffect(() => {
    if(postCargando || respuesta) {
      setVisibilidadToast(true)

      setTimeout(() => {
        setVisibilidadToast(false)
      }, 2000);
    }
  }, [postCargando, respuesta])


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
        {
          visibilidadToast &&
          <PopUp cargando={postCargando} respuesta={respuesta} />
        }
      </AnimatePresence>
      <ModalPublicacion 
        visible={mostrarModalPublicacion} 
        cerrarModal={closeModal} 
        enviarPeticion={enviarPeticion} 
      />

    </div>
  );
};

// !? Modal para mostrar en la creacion de una nueva publicacion.
//! Se debe de cambiar por un archivo unico.

const ModalPublicacion = ({ visible, cerrarModal, enviarPeticion }) => {
  const referenciaFile = useRef(null)
  const [publicacion, setPublicacion] = useState({
    titulo: "",
    descripcion: "",
    imagen: "cualquiera"
  }) 

  const seleccionarImagen = () => {
    referenciaFile.current.click()
  }

  const modificarPublicacion = (ev) => {
    const nombre = ev.target.name
    const valor = ev.target.value

    setPublicacion({
      ...publicacion,
      [nombre]: valor
    })
  }

  const capturarFile = () => {
    
  }

  const subirPublicacion = async () => {
    // Primero debemos de validar la informacion...
    cerrarModal()
    await enviarPeticion('publicaciones', publicacion)
  };

  return (
    <Dialog.Root open={visible} >
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal-contenido flex-center">
          <Dialog.Title className="modal-titulo">Crea tu publicacion</Dialog.Title>
          <div className="contenido-principal">
            <div className="modal-titulo-publicacion">
              <input type="text" name="titulo" placeholder="Ingresa el titulo de tu publicacion..." onChange={modificarPublicacion} />
            </div>
            <div className="modal-descripcion-publicacion">
              <textarea name="descripcion" id=""  placeholder="Escribe algo..." onChange={modificarPublicacion}>
              </textarea>
            </div>  
            <div className="modal-imagen-publicacion" onClick={seleccionarImagen}>
              <Upload  className="upload-imagen"/>
              <span>Subir imagen</span>
            </div>
          </div>
          <div className="modal-botones flex-center">
            <button onClick={cerrarModal}>Cancelar</button>
            <button onClick={subirPublicacion}>Aceptar</button>
          </div>
          <input type="file" accept="image/png" onChange={capturarFile} hidden ref={referenciaFile} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
};


const PopUp = ({cargando=false, respuesta = true}) => {

  return (
    <motion.div className="advise flex-center"
      initial={{right: "-50%"}}
      animate={{right: "2%"}}
      exit={{right: "-50%"}}
    >
      {
        cargando && <span>Cargando...</span>
      }
      {
        (!cargando && respuesta) && <span>Se añadio correctamente!</span>
      }
      
    </motion.div>
  )
}

export default MemberLayout;
