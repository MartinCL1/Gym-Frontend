import { Outlet, useNavigate } from "react-router-dom";
import "./render.css";
import Profile from "../shared/profile/Profile";
import MenuBoton from "../shared/ui/MenuBoton";
import useSesion from "../hooks/useSesion";
import { useDispatch, useSelector } from "react-redux";
import { establecerUsuario } from "../../store/userSlice/userSlice";
import Loader from "./pages/loader/Loader";
import { setNavegacion } from "../../store/globalSlice";

const Render = () => {
  const show = useSelector((state) => state.global.navegacion);
  const { acceso, cargando, usuario } = useSesion();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!acceso && !cargando) {
    navigate("/", { replace: true });
  } else {
    dispatch(establecerUsuario(usuario));
  }

  const toggleNavegacion = () => {
    dispatch(setNavegacion(!show))
  };

  return cargando ? (
    <Loader />
    ) : (
    <div className="principal">
      <MenuBoton toggleNavegacion={toggleNavegacion} />
      <Outlet />
      <Profile pressed={show} />
    </div>
  );
};

export default Render;
