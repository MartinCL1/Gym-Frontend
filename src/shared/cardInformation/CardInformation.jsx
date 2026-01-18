import { Bookmark, Heart, MessageSquare } from "lucide-react";
import "../share.ui.css";
import BotonIcono from "../ui/BotonIcono";

const CardInformation = ({ data }) => {
  return (
    <div className="card-information-wrapper">
      <div className="card-image">
        <img src={data.photo} alt="" />
      </div>

      <section className="card-information-user">
        <div className="card-information">
          <h3>{data.username}</h3>
          <div>
            <p>{data.descripcion}</p>
            <div className="card-information-icons">
              <BotonIcono Icono={Heart} text={data.likes} estilos={"like"} />
              <BotonIcono Icono={MessageSquare} text={data.comments} />
              <BotonIcono Icono={Bookmark} estilos={"bookmark"} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CardInformation;
