import { Link } from "react-router-dom";

const Boton = ({ Icon, text, path }) => {
  return (
    <Link to={path} style={{display: "flex", alignItems: "center", gap: "4px", backgroundColor: "black", border: ".5px solid #cccccc80"}}>
      <span style={{color: "white"}}>{text}</span>
      {Icon && <Icon width={15} />}
    </Link>
  );
};

export default Boton;