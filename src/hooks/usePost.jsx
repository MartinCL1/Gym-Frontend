import { useState } from "react"


export const usePost = () => {
    const [cargando, setCargando] = useState(false)
    const [respuesta, setRespuesta] = useState(null)
    const [error, setError] = useState(null)

    const enviarPeticion = async(ruta, datos) => {
        setCargando(false)

        try {
            const peticion = await fetch(`http://localhost:3500/${ruta}`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(datos),
                headers: {"Content-Type": "application/json"}
            })

            const respuestaPeticion = await peticion.json() 

            setCargando(false)
            setRespuesta(respuestaPeticion)
        } catch {
            setCargando(false)
            setError(true)
        }

    }

    return { cargando, error, respuesta, enviarPeticion }
}