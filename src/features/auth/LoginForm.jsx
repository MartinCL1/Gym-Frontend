import { useState } from "react";
import "./auth.css";
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
    const respuestaSesion = await fetch("http://localhost:3500/login",
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

  return <section className="login-form flex-center">
    <section className="login-form--content">
      <section className={`wrapper-login ${showSignUp ? "left" : "no-left"}`}>
        <AnimatePresence mode="wait">
          {!showSignUp ? (
            <motion.div
              key={"login"}
              className="login-form--content-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-4xl">Bienvenido!</h1>
              <span>El entrenamiento espera!</span>
              <div className="login-form--content-input">
                <label htmlFor="nombre_usuario">Username</label>
                <input type="text" onChange={llenarFormUsuario} name="nombre_usuario" id="nombre_usuario" />
              </div>
              <div className="login-form--content-input">
                <label htmlFor="contrasena">Password</label>
                <input
                  type={visiblePassword.loginPassword ? "text" : "password"}
                  name="contrasena"
                  onChange={llenarFormUsuario}
                  id="contrasena"
                />
                {visiblePassword.loginPassword ? (
                  <EyeOff
                    className="icon"
                    onClick={() => switchVisibility("loginPassword")}
                  />
                ) : (
                  <Eye
                    className="icon"
                    onClick={() => switchVisibility("loginPassword")}
                  />
                )}
              </div>
              <div className="login-options flex-center">
                <Boton Icon={LogIn} accion={iniciarSesion} text={"Ingresar"} />
                <button
                  onClick={switchToSignUp}
                  className="login-options--register"
                >
                  Registrarse
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={"signup"}
              className="login-form--content-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h1>Registrate</h1>
              <div className="signup-wrapper-form">
                <div className="login-form--content-input">
                  <label htmlFor="correo">Correo</label>
                  <input type="text"
                    className="font-light text-white" id="correo"
                    name="correo"
                    onChange={obtenerInfoRegistro} />
                </div>
                <div className="login-form--content-input">
                  <label htmlFor="contrasena_registro">Contrasena</label>
                  <input
                    type={
                      visiblePassword.registerPassword ? "text" : "password"
                    }
                    onChange={obtenerInfoRegistro}
                    name="contrasena"
                    id="contrasena_registro"
                  />
                  {visiblePassword.registerPassword ? (
                    <EyeOff
                      className="icon"
                      onClick={() => switchVisibility("registerPassword")}
                    />
                  ) : (
                    <Eye
                      className="icon"
                      onClick={() => switchVisibility("registerPassword")}
                    />
                  )}
                </div>
                <div className="login-form--content-input">
                  <label htmlFor="">Confirmar Contrasena</label>
                  <input
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
                      className="icon"
                      onClick={() =>
                        switchVisibility("registerPasswordConfirmation")
                      }
                    />
                  ) : (
                    <Eye
                      className="icon"
                      onClick={() =>
                        switchVisibility("registerPasswordConfirmation")
                      }
                    />
                  )}
                </div>
              </div>
              <div className="login-options flex-center">
                <Boton Icon={LogIn} text={"Registrar"} accion={enviarRegistro} />
                <button
                  onClick={switchToSignUp}
                  className="login-options--register"
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
        className={`login-cover--register ${showSignUp ? "right" : "no-right"
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
