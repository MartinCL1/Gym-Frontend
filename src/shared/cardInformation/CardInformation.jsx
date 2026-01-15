import { Bookmark, Heart, MessageSquare } from "lucide-react";
import "../share.ui.css";

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
            <div className="flex-center">
              <Heart />
              <span>{data.likes}</span>
            </div>
            <div className="flex-center">
              <MessageSquare /> {data.comments}
            </div>
            <div className="flex-center">
              <Bookmark />
            </div>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CardInformation;
