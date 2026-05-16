import ImageKit from "imagekit-javascript";

const imagekit = new ImageKit({
  publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
});

const subirImagen = (file, folder, credentials) => {
  const safeName = `${file.name}`.replace(/[^a-zA-Z]+/g, "-");  // Name to save in the database.

  return new Promise((resolve, reject) => {

    imagekit.upload(
      {
        file,
        fileName: safeName,
        folder,
        token: credentials.token,
        expire: credentials.expire,
        signature: credentials.signature
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}


const guardarImagenBackend = async (uploaded) => {
  const res = await fetch(`${import.meta.env.VITE_API_IMAGENES}/auth`, { credentials: "include" });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Failed to save image on backend");
  }

  const credenciales = await res.json()
  return credenciales;
}

const crearPublicacion = async (file, publicacion) => {

  try {
    const respAuthImagen = await fetch(`${import.meta.env.VITE_API_IMAGENES}/auth`, { credentials: "include" })
    const credenciales = await respAuthImagen.json()

    console.log(credenciales)
    const respuestaUpload = await new Promise((resolve, reject) => {
      imagekit.upload({
        file: file,
        fileName: file.name,
        folder: "/",
        token: credenciales.token,
        expire: credenciales.expire,
        signature: credenciales.signature
      }, (err, result) => {
        if (err) return reject(err);
        resolve(result)
      })
    })


    const subidaPublicacion = await fetch(import.meta.env.VITE_API_PUBLICACIONES, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...publicacion, imagen: respuestaUpload.url })
    })

    if(!subidaPublicacion.ok) {
      throw new Error()
    }
    
    const respuestaSubidaPublicacion = await subidaPublicacion.json()

    return {respPublicacion: respuestaSubidaPublicacion, imagenResp: respuestaUpload}

  } catch (error) {
    console.log(error.message)
  }


}

export { guardarImagenBackend, subirImagen, crearPublicacion }