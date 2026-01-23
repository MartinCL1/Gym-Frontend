import { X } from "lucide-react";
import "../alimentacion.css";

const ModalAlimentacion = ({ alimentacion }) => {
  const cerrarModal = () => {
    console.log("Holas");
  };

  return (
    <div className="modal-alimentacion flex-center">
      <X onClick={cerrarModal} className="close-modal" width={29} height={29} />
      <div className="modal-alimentacion-contenido">
        <div className="modal-alimentacion-titulo">
          <h2>{alimentacion.objetivo}</h2>
        </div>

        <div className="alimentacion-contenido-wrapper">
          {Object.keys(alimentacion.macros).map((data) => (
            <div key={data}>
              <span
                className="alimentacion-contenido-titulo"
                style={{ textTransform: "capitalize" }}
              >
                {data}:{" "}
              </span>
              <span style={{ textTransform: "capitalize" }}>
                {alimentacion.macros[data]}
              </span>
              <br />
            </div>
          ))}

          
          <span className="alimentacion-contenido-titulo">
            Recomendaciones:{" "}
          </span>
          {Object.keys(alimentacion.recomendaciones).map((data) => (
            <div key={data}>
              <span
                style={{
                  textTransform: "capitalize",
                  padding: "0 24px",
                  display: "block",
                }}
              >
                - {alimentacion.recomendaciones[data]}.
              </span>
            </div>
          ))}

          <span className="alimentacion-contenido-titulo">
            Recomendaciones:{" "}
          </span>
          {Object.keys(alimentacion.comidas).map((data) => (
            <div key={data}>
              <span
                style={{
                  textTransform: "capitalize",
                  padding: "0 24px",
                  display: "block",
                }}
              >
                - {alimentacion.comidas[data]}.
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalAlimentacion;

// {
//       id: "mantenimiento",
//       objetivo: "Mantenimiento",
//       descripcion: "Equilibrio entre las calorías consumidas y gastadas.",
//       macros: {
//         proteina: "media_alta",
//         carbohidratos: "media",
//         grasas: "media",
//       },
//       recomendaciones: [
//         "Mantén hábitos sostenibles",
//         "Ajusta la alimentación según tu actividad física",
//         "Permite flexibilidad",
//       ],
//       comidas: {
//         desayuno: ["Huevos o yogurt", "Pan integral o fruta"],
//         almuerzo: ["Proteína", "Carbohidratos", "Verduras"],
//         snack: ["Fruta", "Yogurt", "Frutos secos"],
//         cena: ["Comida similar al almuerzo pero más ligera"],
//       },
