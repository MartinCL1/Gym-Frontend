import { Link } from "react-router-dom";
import "./profile.css";
import BannerProfile from "../../features/profile/components/BannerProfile";
import { useEffect, useRef, useState } from "react";

const Profile = ({ pressed }) => {
  const profileRef = useRef(null);
  const [profileSize, setProfileSize] = useState(0);

  useEffect(() => {
    (async() => {
      const size = profileRef?.current.getBoundingClientRect().width;
      setProfileSize(size);
    })()
  }, [pressed]);
 
  return (
    <div
      className={`member-wrapper-profile`}
      style={pressed ? { left: `calc(100% - ${profileSize}px)` } : {left: '100%'}}
      ref={profileRef}
    >
      <BannerProfile />
      <div className="member-wrapper-options">
        <Link className="member-wrapper-option" to={"memberSection"}>Inicio</Link>
        <Link className="member-wrapper-option">Mi Progreso</Link>
        <Link className="member-wrapper-option" to={'memberSection/alimentacion'}>Plan de alimentacion</Link>
        <Link className="member-wrapper-option">Miembros</Link>
        <Link className="member-wrapper-option">Rutinas</Link>
        <Link className="member-wrapper-option">Cerrar Sesion</Link>
      </div>
    </div>
  );
};

export default Profile;
