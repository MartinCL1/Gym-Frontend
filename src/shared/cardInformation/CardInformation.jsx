import { Bookmark, Heart, MessageSquare } from "lucide-react";
import "../share.ui.css";
import BotonIcono from "../ui/BotonIcono";
import { Image, ImageKitProvider } from "@imagekit/react";

const CardInformation = ({ data }) => {

  return (
    <div className="card-information-wrapper">
      <div className="card-image">
        <ImageKitProvider urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT} >
          <Image src={data?.imagen} />
        </ImageKitProvider>
      </div>
    
      <section className="card-information-user">
        <div className="card-information">
          <h3>{data?.titulo}</h3>
          <div>
            <p>{data?.descripcion}</p>
            <div className="card-information-icons">
              <BotonIcono Icono={Heart} text={data?.interacciones} estilos={"like"} />
              <BotonIcono Icono={MessageSquare} text={data?.comentarios} />
              <BotonIcono Icono={Bookmark} estilos={"bookmark"} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CardInformation;
