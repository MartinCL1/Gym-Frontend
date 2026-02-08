import { useState } from "react"


const usePost = () => {
    const [cargando, setCargando] = useState(false)
    const [respuesta, setRespuesta] = useState(null)
    const [error, setError] = useState(null)

    const enviarPeticion = () => {
        setCargando(false)

        try {
            const peticion = fetch('http://localhost:3500/')
        }catch {

        }

    }

    return {cargando, respuesta, enviarPeticion}
}