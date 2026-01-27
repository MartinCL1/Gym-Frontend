import { useEffect, useState } from "react"

const useSesion = () => {
    const [acceso, setAcceso] = useState(false)

    useEffect(() => {
        (async () => {
            await comprobarSesion(); 
        })()
    }, [])

    const comprobarSesion = async () => {
        const sesion = await fetch("http://localhost:3500/login", {credentials: "include"});
        const sesionStatus = await sesion.json()
        setAcceso(sesionStatus.respuesta)
    }

    return {acceso}
}

export default useSesion;