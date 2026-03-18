import "./member.css";
import CardInformation from "../../../shared/cardInformation/CardInformation";
import React, { useEffect, useRef, useState } from "react";
import { usePost } from "../../../hooks/usePost";
import { Dialog } from "radix-ui";
import { AnimatePresence, motion } from 'motion/react'
import { Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { anadirPublicacion } from "../../../../store/publicacionesSlice/publicacionesSlice";
import useGetPublicaciones from "../../../hooks/Publicaciones/useGetPublicaciones";
import { v4 as uuidv4 } from 'uuid'
import { crearPublicacion, guardarImagenBackend, subirImagen, } from "../../../services/imagekit.services";
import WarningForm from "../../../shared/ui/WarningForm";

const MemberLayout = React.memo(() => {
  const [mostrarModalPublicacion, setMostrarModalPublicacion] = useState(false);
  const { cargando: postCargando, respuesta } = usePost(false);
  const [visibilidadToast, setVisibilidadToast] = useState(false)
  const publicaciones = useSelector((state) => state.publicaciones.publicaciones)
  const { cargandoPublicaciones, errorPublicaciones, respuestaPublicaciones } = useGetPublicaciones()

  // esto lo podemos remover a un componente que sirva pra mostrar el mensaje de adicion
  useEffect(() => {
    if (postCargando || respuesta) {
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
        {(!errorPublicaciones && !cargandoPublicaciones && respuestaPublicaciones && publicaciones !== null) ?
          publicaciones.map((data) => <CardInformation data={data} key={data?.key} />) : <div style={{ color: "white" }}>No hay publicaciones para mostrar</div>
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
      />
    </div>
  );
}) ;

// !? Modal para mostrar en la creacion de una nueva publicacion.
//! Se debe de cambiar por un archivo unico.

const ModalPublicacion = ({ visible, cerrarModal}) => {
  const dispatch = useDispatch();
  const [warning, setWarning] = useState(false)
  const referenciaFile = useRef(null);

  //URL creado para dar una vista previa
  const [preview, setPreview] = useState("")
  // Archivo directo para almacenar
  const [imagenPublicacion, setImagenPublicacion] = useState(null)
  //  ----------------------------
  const [publicacion, setPublicacion] = useState({
    key: "",
    publicador: "",
    interacciones: 0,
    comentarios: 0,
    guardado: 0,
    descripcion: "",
    imagen: "",
    titulo: ""
  })

  const cancelarPublicacion = () => {
    formatearCampos()
    cerrarModal()
  }

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

    setWarning(false)
  }

  const capturarFile = async (e) => {
    const file = e.target.files[0]
    try {
      const url = URL.createObjectURL(file)
      setPreview(url)
      setImagenPublicacion(file)
    } catch (error) {
      console.log(error.message)
    }
  }

  const subirPublicacion = async () => {
    const key = uuidv4();
    const nuevaPublicacion = {
      ...publicacion,
      key
    }

    const camposLlenos = comprobarCampos()
    if (!camposLlenos) return

    const { imagenResp } = await crearPublicacion(imagenPublicacion, publicacion)
    const nieva = imagenResp.url
    cerrarModal()

    const publicacionFinal = {
      ...nuevaPublicacion,
      imagen: nieva
    }

    dispatch(anadirPublicacion(publicacionFinal))
    formatearCampos()
  }

  const comprobarCampos = () => {
    if (publicacion.titulo === "" ||
      publicacion.descripcion === "" ||
      !preview
    ) {
      setWarning(true)
      return false
    }
    setWarning(false)
    return true
  }


  const formatearCampos = () => {
    setPublicacion({
      key: "",
      publicador: "",
      interacciones: 0,
      comentarios: 0,
      guardado: 0,
      descripcion: "",
      imagen: "",
      titulo: ""
    })
    setPreview("")
    setWarning(false)
  }

  return (
    <Dialog.Root open={visible} >
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal-contenido flex-center">
          {/* { warning &&
            <div className="modal-warning">Llena todos los campos</div>
          } */}
          <AnimatePresence>
            {
              warning && <WarningForm />
            }
          </AnimatePresence>
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
              {preview && <span className="badge-modal-imagen flex-center"><p>1</p></span>}
              <Upload className="upload-imagen" />
              <span>Subir imagen</span>
            </div>
          </div>
          <div className="modal-botones flex-center">
            <button onClick={cancelarPublicacion}>Cancelar</button>
            <button onClick={subirPublicacion}>Aceptar</button>
          </div>
          <input type="file" accept="image/*" required onChange={capturarFile} hidden ref={referenciaFile} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
};


const PopUp = ({ cargando, respuesta }) => {

  return (
    <motion.div className="advise flex-center"
      initial={{ right: "-50%" }}
      animate={{ right: "2%" }}
      exit={{ right: "-50%" }}
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


// Tenemos que agregar algunos mensajes que muestren si el contenido se agrego correctamente hay error o susedio correctamente.