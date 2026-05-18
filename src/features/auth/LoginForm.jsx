import { useState } from "react";
import { EyeOff, Eye, LogIn } from "lucide-react";
import Boton from "../../shared/ui/Boton";
import { AnimatePresence, motion } from "motion/react";
import useSesion from "../../hooks/useSesion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { establecerUsuario } from '../../../store/userSlice/userSlice'
import { registrarPersona } from "../../services/registro.services";
import OtpModal from "../modals/OtpModal";
import { Dialog } from "radix-ui";
import SuccessBar from "../../shared/ui/SuccessBar";

// ! MEJORAR LA ESTRUCTURA DE ESTE COMPONENTE, ESTA DEMASIADO GRANDE Y SE PUEDE SEPARAR EN COMPONENTES MAS PEQUEÑOS. ADEMAS DE QUE HAY FUNCIONES QUE NO TIENEN NADA QUE VER CON EL LOGIN, COMO LAS FUNCIONES PARA MOSTRAR LA CONTRASENA, ESAS FUNCIONES PODRIAN ESTAR EN UN CUSTOM HOOK O EN UN COMPONENTE SEPARADO.
const LoginForm = () => {
  // METODOS PARA REGISTRAR AL USUARIO.
  const [mostrarModalOTP, setMostrarModalOTP] = useState(false)
  const [usuarioCreado, setUsuarioCreado] = useState(false)
  const [credencialesRegistro, setCredencialesRegistro] = useState({
    correo: "",
    contrasena: "",
    confirmacionContrasena: ""
  })

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.{8,}$)(?!.*[,])(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=[\]{};:'"\\|.<>\/\?~]+$/;

  const mostrarUsuarioCreado = (estado) => {
    setUsuarioCreado(estado)
  }

  const obtenerInfoRegistro = async (trigger) => {
    const triggerName = trigger?.target?.name
    setCredencialesRegistro({
      ...credencialesRegistro,
      [triggerName]: trigger?.target?.value
    })
  }

  // Vamos a agregar indempotencia a esta funcion.
  const enviarRegistro = async () => {
    const esValido = evalCredencialesRegistro();
    if (!esValido) return;
    const respuesta = await registrarPersona(credencialesRegistro)
    setMostrarModalOTP(respuesta.respuesta)
  }

  //! mostrar el alert de que el correo no es valido, que la contrasena no es valida o que las contrasenas no coinciden. Y agregar un loader mientras se envia la peticion de registro.
  const evalCredencialesRegistro = () => {
    const { correo, contrasena, confirmacionContrasena } = credencialesRegistro;
    if (!emailRegex.test(correo)) return false;
    if (!passwordRegex.test(contrasena)) return false;
    if (contrasena !== confirmacionContrasena) return false;
    return true;
  }
  // const enviarRegistro = async () => {
  //   const respuesta = await registrarPersona(credencialesRegistro)
  //   if (respuesta.respAccion) {
  //     setMostrarModalOTP(true)
  //   }
  // }

  // -------------------------------------------
  const { acceso, cargando, usuario } = useSesion();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (!cargando && acceso) {
    dispatch(establecerUsuario(usuario))
    navigate('/memberSection', { replace: true })
  }

  const [usuarioCredenciales, setUsuarioCredenciales] = useState({
    nombre_usuario: "",
    contrasena: ""
  })

  // TODO Funciones para hacer un login.
  const iniciarSesion = async () => {
    const respuestaSesion = await fetch("https://gym-backendd.vercel.app/login",
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          nombre_usuario: usuarioCredenciales.nombre_usuario,
          contrasena: usuarioCredenciales.contrasena
        }),
        headers: { "Content-Type": "application/json" }
      })
    const respuestaSesionJSON = await respuestaSesion.json();

    if (respuestaSesionJSON.respuesta) return navigate('/memberSection', { replace: true })
  }

  const llenarFormUsuario = (evento) => {
    setUsuarioCredenciales({
      ...usuarioCredenciales,
      [evento.target.name]: evento.target.value
    })
  }

  // TODO -------------------------------
  const [visiblePassword, setVisiblePassword] = useState({
    loginPassword: false,
    registerPassword: false,
    registerPasswordConfirmation: false,
  });
  const [showSignUp, setShowSignUp] = useState(false);

  const switchVisibility = (name) => {
    setVisiblePassword({
      ...visiblePassword,
      [name]: !visiblePassword[name],
    });
  };

  const restoreVisibility = () => {
    setVisiblePassword((prev) => {
      return Object.keys(prev).map((valor) => [valor, false]); // Lo que necesitaba era retornar el elemento pero dentro del state.
    });
  };

  const switchToSignUp = () => {
    setShowSignUp(!showSignUp);
    restoreVisibility();
  };

  return <section className="flex h-screen w-screen items-center justify-center">
    <section className="relative flex w-[95%] max-w-100 h-1/2 items-center overflow-hidden rounded-sm border border-gray-400 lg:max-w-2xl">
      <section className={`absolute h-full w-full text-white transition-[left] duration-250 ease-in-out max-[600px]:static ${showSignUp ? "left-1/2" : "left-0"}`}>
        <AnimatePresence mode="wait">
          {!showSignUp ? (
            <motion.div
              key={"login"}
              className="flex h-full w-1/2 flex-col items-center justify-center will-change-[transform,opacity] max-[600px]:w-full max-[600px]:gap-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-3xl">Bienvenido!</h1>
              <span className="text-md">El entrenamiento espera!</span>
              <div className="relative py-8 w-[90%] max-w-[250px]">
                <label className="px-1 pb-  .5  text-base" htmlFor="nombre_usuario">Username</label>
                <input className="w-full border-0 border-b border-white bg-transparent py-1 pr-[35px] pl-1 text-[small] text-white outline-none" type="text" onChange={llenarFormUsuario} name="nombre_usuario" id="nombre_usuario" />
              </div>
              <div className="relative w-[90%] my-4 max-w-[250px]">
                <label className="px-1 pb-0.5 text-base" htmlFor="contrasena">Password</label>
                <input
                  className="w-full border-0 border-b border-white bg-transparent py-1 pr-[35px] pl-1 text-[small] text-white outline-none"
                  type={visiblePassword.loginPassword ? "text" : "password"}
                  name="contrasena"
                  onChange={llenarFormUsuario}
                  id="contrasena"
                />
                {visiblePassword.loginPassword ? (
                  <EyeOff
                    className="absolute right-0 bottom-0.5 w-5 cursor-pointer"
                    onClick={() => switchVisibility("loginPassword")}
                  />
                ) : (
                  <Eye
                    className="absolute right-0 bottom-0.5 w-5 cursor-pointer"
                    onClick={() => switchVisibility("loginPassword")}
                  />
                )}
              </div>
              <div className="flex flex-col pt-5 items-center justify-center gap-2">
                <Boton Icon={LogIn} accion={iniciarSesion} text={"Ingresar"} />
                <button
                  onClick={switchToSignUp}
                  className="bg-transparent text-white/[0.664] hover:underline"
                >
                  Registrarse
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={"signup"}
              className="flex h-full w-1/2 flex-col items-center  justify-around p-4 will-change-[transform,opacity] max-[600px]:w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-3xl">Registrate</h1>
              <div className="flex flex-col gap-4">
                <div className="relative mt-[1em] w-[90%] max-w-62.5">
                  <label className="px-1 pb-0.5 pr-8.75 text-base" htmlFor="correo">Correo</label>
                  <input type="text"
                    className="w-full border-0 border-b border-white bg-transparent py-1 pr-[35px] pl-1 text-[small] text-white outline-none font-light" id="correo"
                    name="correo"
                    onChange={obtenerInfoRegistro} />
                </div>
                <div className="relative mt-[1em] w-[90%] max-w-62.5">
                  <label className="px-1 pb-0.5 pr-8.75 text-base" htmlFor="contrasena_registro">Contrasena</label>
                  <input
                    className="w-full border-0 border-b border-white bg-transparent py-1 pr-[35px] pl-1 text-[small] text-white outline-none"
                    type={
                      visiblePassword.registerPassword ? "text" : "password"
                    }
                    onChange={obtenerInfoRegistro}
                    name="contrasena"
                    id="contrasena_registro"
                  />
                  {visiblePassword.registerPassword ? (
                    <EyeOff
                      className="absolute right-0 bottom-0.5 w-5 cursor-pointer"
                      onClick={() => switchVisibility("registerPassword")}
                    />
                  ) : (
                    <Eye
                      className="absolute right-0 bottom-0.5 w-5 cursor-pointer"
                      onClick={() => switchVisibility("registerPassword")}
                    />
                  )}
                </div>
                <div className="relative mt-[1em] w-[90%] max-w-62.5">
                  <label className="px-1 pb-0.5 pr-8.75 text-base" htmlFor="">Confirmar Contrasena</label>
                  <input
                    className="w-full border-0 border-b border-white bg-transparent py-1 pr-[35px] pl-1 text-[small] text-white outline-none"
                    type={
                      visiblePassword.registerPasswordConfirmation
                        ? "text"
                        : "password"
                    }
                    name="confirmacionContrasena"
                    onChange={obtenerInfoRegistro}
                  />
                  {visiblePassword.registerPasswordConfirmation ? (
                    <EyeOff
                      className="absolute right-0 bottom-0.5 w-5 cursor-pointer"
                      onClick={() =>
                        switchVisibility("registerPasswordConfirmation")
                      }
                    />
                  ) : (
                    <Eye
                      className="absolute right-0 bottom-0.5 w-5 cursor-pointer"
                      onClick={() =>
                        switchVisibility("registerPasswordConfirmation")
                      }
                    />
                  )}
                </div>
              </div>
              <div className="m-auto flex flex-col flex-wrap items-center justify-center gap-2">
                <Boton Icon={LogIn} text={"Registrar"} accion={enviarRegistro} />
                <button
                  onClick={switchToSignUp}
                  className="bg-transparent text-white/[0.664] hover:underline"
                >
                  Inicar Sesion
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <img
        src="https://cdn.pixabay.com/photo/2016/11/29/09/10/man-1868632_1280.jpg"
        alt="gym-cover"
        className={`absolute h-full w-1/2 object-cover object-center transition-[right] duration-[250ms] ease-out max-[600px]:hidden ${showSignUp ? "right-1/2" : "right-0"
          }`}
      />
    </section>
    <AnimatePresence>
      {
        usuarioCreado && (
          <SuccessBar message={"Usuario creado con exito!"} visible={usuarioCreado} />
        )
      }
    </AnimatePresence>
    {
      mostrarModalOTP && (
        <Dialog.Root
          open={mostrarModalOTP}
          onOpenChange={setMostrarModalOTP}
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content className="bg-black/75 inset-0 absolute flex items-center justify-center">
              <OtpModal cerrarModal={() => setMostrarModalOTP(false)} credenciales={credencialesRegistro} setUsuarioCreado={mostrarUsuarioCreado} />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )
    }
  </section>
};

export default LoginForm;
