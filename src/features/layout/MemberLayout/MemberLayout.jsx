import "./member.css";
import CardInformation from "../../../shared/cardInformation/CardInformation";
import { useEffect, useRef, useState } from "react";
import { usePost } from "../../../hooks/usePost";
import { Dialog } from "radix-ui";
import { AnimatePresence, motion } from 'motion/react'
import { Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { anadirPublicacion} from "../../../../store/publicacionesSlice/publicacionesSlice";
import useGetPublicaciones from "../../../hooks/Publicaciones/useGetPublicaciones";
import { v4 as uuidv4 } from 'uuid'
const imagen = import.meta.env.VITE_IMAGENES_PRUEBA

const MemberLayout = () => {
  const [mostrarModalPublicacion, setMostrarModalPublicacion] = useState(false);
  const { cargando:postCargando, respuesta, enviarPeticion } = usePost(false);
  const [visibilidadToast, setVisibilidadToast] = useState(false)
  const publicaciones = useSelector((state) => state.publicaciones.publicaciones)
  const {cargandoPublicaciones, errorPublicaciones, respuestaPublicaciones} = useGetPublicaciones()

  // esto lo podemos remover a un componente que sirva pra mostrar el mensaje de adicion
  useEffect(() => {
    if(postCargando || respuesta) {
      setVisibilidadToast(true)

      setTimeout(() => {
        setVisibilidadToast(false)
      }, 2000);
    }

  }, [postCargando, respuesta])

  useEffect(() => {
    console.log(publicaciones)
  }, [publicaciones])

  const closeModal = () => {
    setMostrarModalPublicacion(false);
  };
  
  const openModal = () => {
    setMostrarModalPublicacion(true);
  };

  return (
    <div className="member-wrapper">
      <div className="member-wrapper-content">
        { (!errorPublicaciones && !cargandoPublicaciones && respuestaPublicaciones) &&
          publicaciones.map((data) => <CardInformation data={data} key={data?.key} />)
        }
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
  const dispatch = useDispatch();
  const referenciaFile = useRef(null);
  //? Publicacion que se subira
  // .select("publicador, interacciones, comentarios, guardado, descripcion, imagen, titulo")
  const [publicacion, setPublicacion] = useState({
    key: "",
    publicador: "",
    interacciones: 0,
    comentarios: 0,
    guardado: 0,
    descripcion: "",
    imagen: imagen,
    titulo: ""
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
    setPublicacion({
      ...publicacion,
      ["key"]: uuidv4()
    })
    const camposLlenos = comprobarCampos()

    if(!camposLlenos) return
    dispatch(anadirPublicacion(publicacion))
    await enviarPeticion(publicacion)
  };+3
  

  const comprobarCampos = () => {
    if(!publicacion.imagen.length > 0 || 
      !publicacion.titulo > 0) {
        return false
    }
    return true
  }

  return (
    <Dialog.Root open={visible} >
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal-contenido flex-center">
          <Dialog.Title className="modal-titulo">Crea tu publicacion</Dialog.Title>
          <div className="contenido-principal">
            <div className="modal-titulo-publicacion">
              <input type="text" name="titulo" required autoComplete="off" placeholder="Ingresa el titulo de tu publicacion..." onChange={modificarPublicacion} />
            </div>
            <div className="modal-descripcion-publicacion">
              <textarea name="descripcion" id="" required placeholder="Escribe algo..." onChange={modificarPublicacion}>
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
          <input type="file" accept="image/png" required onChange={capturarFile} hidden ref={referenciaFile} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
};


const PopUp = ({cargando, respuesta}) => {

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
