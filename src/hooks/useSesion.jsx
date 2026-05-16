import { useEffect, useState } from "react"

const useSesion = () => {
    const [acceso, setAcceso] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [usuario, setUsuario] = useState({})

    useEffect(() => {
        (async () => {
            await comprobarSesion(); 
        })()
    }, [])

    const comprobarSesion = async () => {
        try {
            const sesion = await fetch("http://localhost:3500/login", {credentials: "include"});
            const sesionStatus = await sesion.json()
            setUsuario(sesionStatus.informacion)
            setAcceso(sesionStatus.respuesta)
            setCargando(false)
        }catch(error) {
            console.log(error.message)
        }
    }

    return {acceso, cargando, usuario}
}

export default useSesion;