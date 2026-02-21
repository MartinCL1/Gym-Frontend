import { useEffect, useState } from "react";
import { obtenerPublicaciones } from "../../services/publicaciones.services";
import { useDispatch } from "react-redux";
import { establecerPublicaciones } from "../../../store/publicacionesSlice/publicacionesSlice";

const useGetPublicaciones = () => {
  const [ respuestaPublicaciones, setRespuestaPublicaciones ] = useState(null)
  const [ cargandoPublicaciones, setCargandoPublicaciones ] = useState(null);
  const [ errorPublicaciones, setErrorPublicaciones ] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      setRespuestaPublicaciones(null)
      setCargandoPublicaciones(true)
      try {
        const publicaciones = await obtenerPublicaciones()
        setRespuestaPublicaciones(publicaciones.respuesta)
        setCargandoPublicaciones(false)
        dispatch(establecerPublicaciones(publicaciones.informacion))
      } catch (e) {
        setErrorPublicaciones(e.message)
        setCargandoPublicaciones(false)
      }
    })()
  }, [dispatch])

  return { respuestaPublicaciones, cargandoPublicaciones, errorPublicaciones }
}

export default useGetPublicaciones;