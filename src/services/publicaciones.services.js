const apiUrl = import.meta.env.VITE_API_PUBLICACIONES

const obtenerPublicaciones = async () => {
    const requestPublicaciones = await fetch(apiUrl, {credentials: "include"})
    const responsePublicaciones = await requestPublicaciones.json()
    
    return responsePublicaciones
}

const insertarPublicacion = async (payload) => {
    const peticionInsercion = await fetch(`${apiUrl}`, 
    { method: "POST",
      credentials: "include", 
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    })

    const respuestaInsercion = await peticionInsercion.json()
    console.log("respuesta insercion: ",respuestaInsercion)
    return respuestaInsercion;
}

export {obtenerPublicaciones, insertarPublicacion}