import { useState } from "react"
import { insertarPublicacion } from "../services/publicaciones.services"

export const usePost = () => {
    const [cargando, setCargando] = useState(null)
    const [respuesta, setRespuesta] = useState(null)
    const [error, setError] = useState(null)

    const enviarPeticion = async( datos ) => {
        setCargando(true)

        try {
            const peticion = await insertarPublicacion(datos)
            console.log(peticion)
            setRespuesta(peticion.respuesta)
            setCargando(false)
        } catch( error ) {
            setCargando(false)
            setError(error)
        }

    }

    return { cargando, error, respuesta, enviarPeticion }
}