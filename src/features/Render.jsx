import { Outlet } from "react-router-dom";

const Render = () => {
  const estilos = {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#070707",
    overflow: "hidden",
  };

  return (
    <div style={estilos}>
      <Outlet />
    </div>
  );
};

export default Render;
