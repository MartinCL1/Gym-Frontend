// import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import "../share.ui.css";

const MenuBoton = ({ to = "/", accion }) => {
  return (
    <button to={to} onClick={accion} className="menu-boton">
      <Menu />
    </button>
  );
};

export default MenuBoton;
