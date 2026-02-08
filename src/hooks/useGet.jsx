import { useEffect, useState } from "react";

const useGet = ( url ) => {
    const [cargando, setCargando] = useState(true);
    const [acceso, setAcceso] = useState(false);
    const [informacion, setInformacion] = useState(null)

    useEffect(() => {
        (async() => {
                await realizarPeticion()
        })()
    }, [])
    
    const realizarPeticion = async () => {
        try {
            const peticion = await fetch(url, {credentials: "include"})
            const peticionResp = await peticion.json()
            console.log("peticiones: ",peticionResp);
            setAcceso(peticionResp.respuesta)
            setInformacion(peticionResp.informacion)
            setCargando(false)
            
        }catch(error) {
            console.log(error.message)
        }
    }

    return {cargando, informacion, acceso}
}

export default useGet;