const registrarPersona = async (credenciales) => {
    const respuestaRegistro = await fetch("http://localhost:3500/registro", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(credenciales),
        headers: { "Content-Type": "application/json" }
    })

    return await respuestaRegistro.json()
}

const confirmarCodigo =  async (codigo, credenciales) => {
    credenciales.codigo = codigo
    const respuestaConfirmacion = await fetch(`http://localhost:3500/registro/verificar`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(credenciales),         
        headers: { "Content-Type": "application/json" }
    })  

    return await respuestaConfirmacion.json()
}

export { registrarPersona, confirmarCodigo }