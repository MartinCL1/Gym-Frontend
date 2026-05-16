// import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import "../share.ui.css";

const MenuBoton = ({ to = "/", toggleNavegacion }) => {
  return (
    <button to={to} onClick={toggleNavegacion} className="menu-boton">
      <Menu />
    </button>
  );
};

export default MenuBoton;
