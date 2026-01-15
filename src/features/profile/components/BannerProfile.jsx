import Boton from "../../../shared/ui/Boton";
import "./styles.css";

const BannerProfile = ({ username = "Martin W. Cox", role = "Member" }) => {
  return (
    <div className="profile-image flex-center">
      <div className="profile-avatar flex-center">
        <img
          src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_hybrid&w=740&q=80"
          alt=""
        />
      </div>
      <div className="flex-center profile-information">
        <span>{username}</span>
        <p>{role}</p>
      </div>
      <Boton path={"perfil"} text={"Ver Perfil"} />
    </div>
  );
};

export default BannerProfile;
