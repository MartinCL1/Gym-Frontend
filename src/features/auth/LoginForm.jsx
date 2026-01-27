import { useState } from "react";
import "./auth.css";
import { EyeOff, Eye, LogIn } from "lucide-react";
import Boton from "../../shared/ui/Boton";
import { AnimatePresence, motion } from "motion/react";
import useSesion from "../../hooks/useSesion";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { acceso } = useSesion();
  const navigate = useNavigate()

  if(acceso) {
    navigate('/memberSection', {replace: true})
  }

  const [ usuarioCredenciales, setUsuarioCredenciales ] = useState ( {
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
      headers: {"Content-Type": "application/json"}
    })
    const respuestaSesionJSON = await respuestaSesion.json();
    console.log(respuestaSesionJSON)
  }

  const llenarFormUsuario = (evento) => {
    setUsuarioCredenciales({
      ...usuarioCredenciales,
      [evento.target.name]: evento.target.value
    })
    console.log(usuarioCredenciales)
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

  return (
    <section className="login-form flex-center">
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
                <h1>Bienvenido!</h1>
                <span>El entrenamiento espera!</span>
                <div className="login-form--content-input">
                  <label htmlFor="">Username</label>
                  <input type="text" onChange={llenarFormUsuario} name="nombre_usuario" />
                </div>
                <div className="login-form--content-input">
                  <label htmlFor="">Password</label>
                  <input
                    type={visiblePassword.loginPassword ? "text" : "password"}
                    name="contrasena"
                    onChange={llenarFormUsuario}
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
                    <label htmlFor="">Correo</label>
                    <input type="text" />
                  </div>
                  <div className="login-form--content-input">
                    <label htmlFor="">Contrasena</label>
                    <input
                      type={
                        visiblePassword.registerPassword ? "text" : "password"
                      }
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
                  <Boton Icon={LogIn} text={"Registrar"} />
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
          className={`login-cover--register ${
            showSignUp ? "right" : "no-right"
          }`}
        />
      </section>
    </section>
  );
};

export default LoginForm;
