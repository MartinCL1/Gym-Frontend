import { Outlet } from "react-router-dom";
import "./render.css";
import { useState } from "react";
import Profile from "../shared/profile/Profile";
import MenuBoton from "../shared/ui/MenuBoton";

const Render = () => {
  const [show, setShow] = useState(false);

  const accion = () => {
    setShow(!show);
  };
  return (
    <div className="principal">
      <MenuBoton accion={accion} />
      <Outlet />
      <Profile pressed={show} />
    </div>
  );
};

export default Render;
