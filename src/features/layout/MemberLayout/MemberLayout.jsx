import "./member.css";
import MenuBoton from "../../../shared/ui/MenuBoton";
import { useState } from "react";
import CardInformation from "../../../shared/cardInformation/CardInformation";
import Profile from "../../../shared/profile/Profile";

const MemberLayout = () => {
  const [show, setShow] = useState(false);

  const accion = () => {
    setShow(!show);
  };

  const cardData = [
    {
      username: "María García",
      photo: "https://picsum.photos/300/300?random=1",
      likes: 245,
      comments: 12,
      descripcion: "Disfrutando del atardecer en la playa",
    },
    {
      username: "Carlos López",
      photo: "https://picsum.photos/300/300?random=2",
      likes: 189,
      comments: 8,
      descripcion: "Café con amigos en la ciudad",
    },
    {
      username: "Ana Rodríguez",
      photo: "https://picsum.photos/300/300?random=3",
      likes: 412,
      comments: 25,
      descripcion: "Aventura en las montañas",
    },
    {
      username: "Juan Martínez",
      photo: "https://picsum.photos/300/300?random=4",
      likes: 356,
      comments: 19,
      descripcion: "Momento especial con familia",
    },
    {
      username: "Laura Fernández",
      photo: "https://picsum.photos/300/300?random=5",
      likes: 278,
      comments: 14,
      descripcion: "Viaje al extranjero",
    },
    {
      username: "Diego Sánchez",
      photo: "https://picsum.photos/300/300?random=6",
      likes: 521,
      comments: 31,
      descripcion: "Fin de semana en el campo",
    },
    {
      username: "Sofia Morales",
      photo: "https://picsum.photos/300/300?random=7",
      likes: 167,
      comments: 6,
      descripcion: "Evento en la ciudad",
    },
    {
      username: "Pablo Gómez",
      photo: "https://picsum.photos/300/300?random=8",
      likes: 634,
      comments: 42,
      descripcion: "Experiencia increíble en nuevo lugar",
    },
  ];

  return (
    <div className="member-wrapper">
      <MenuBoton accion={accion} />

      <div className="member-wrapper-content">
        {/* Aqui colocamos la info de las demas personas como lo que han publicado*/}
        {cardData.map((data, index) => (
          <CardInformation key={index} data={data} />
        ))}
      </div>
      
      <Profile pressed={show} />
    </div>
  );
};

export default MemberLayout;
