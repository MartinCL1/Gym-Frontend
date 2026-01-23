import { useState } from "react";
import "./alimentacion.css";

const Alimentacion = () => {
  const [filtro, setFiltrar] = useState([])

  const alimentacion = [
    {
      id: 1,
      objetivo: "Bajar grasa",
      descripcion:
        "Déficit calórico moderado enfocado en conservar masa muscular.",
      macros: {
        proteina: "alta",
        carbohidratos: "media_baja",
        grasas: "media_baja",
      },
      recomendaciones: [
        "Prioriza alimentos saciantes",
        "Evita bebidas calóricas",
        "Mantén un consumo alto de proteína",
      ],
      comidas: {
        desayuno: ["Huevos", "Avena o fruta", "Café o té sin azúcar"],
        almuerzo: [
          "Pollo o pescado",
          "Arroz integral o papa (porción controlada)",
          "Verduras",
        ],
        snack: ["Yogurt griego", "Fruta", "Nueces (porción pequeña)"],
        cena: ["Proteína magra", "Verduras", "Carbohidratos mínimos o ninguno"],
      },
    },
    {
      id: 3 ,
      objetivo: "Ganar masa muscular",
      descripcion: "Superávit calórico enfocado en el crecimiento muscular.",
      macros: {
        proteina: "alta",
        carbohidratos: "alta",
        grasas: "media",
      },
      recomendaciones: [
        "No saltarse comidas",
        "Consumir suficientes carbohidratos",
        "Dormir y recuperarse adecuadamente",
      ],
      comidas: {
        desayuno: ["Huevos", "Avena con fruta", "Leche o yogurt"],
        almuerzo: [
          "Carne, pollo o pescado",
          "Arroz, pasta o papas",
          "Verduras",
        ],
        snack_pre_entreno: ["Banana", "Pan o avena"],
        post_entreno: ["Proteína (comida o batido)", "Carbohidratos"],
        cena: ["Proteína", "Carbohidratos", "Grasas saludables"],
      },
    },
    {
      id: "mantenimiento",
      objetivo: "Mantenimiento",
      descripcion: "Equilibrio entre las calorías consumidas y gastadas.",
      macros: {
        proteina: "media_alta",
        carbohidratos: "media",
        grasas: "media",
      },
      recomendaciones: [
        "Mantén hábitos sostenibles",
        "Ajusta la alimentación según tu actividad física",
        "Permite flexibilidad",
      ],
      comidas: {
        desayuno: ["Huevos o yogurt", "Pan integral o fruta"],
        almuerzo: ["Proteína", "Carbohidratos", "Verduras"],
        snack: ["Fruta", "Yogurt", "Frutos secos"],
        cena: ["Comida similar al almuerzo pero más ligera"],
      },
    },
  ];

  return (
    <section className="contenedor alimentacion">
      <div className="alimentacion-objetivos">
        <BotonSelector text={"Bajar Grasa"} />
        <BotonSelector text={"Ganar masa muscular"} />
        <BotonSelector text={"Mantenimiento"} />
      </div>

      <div className="alimentacion-tarjetas">
        {
            alimentacion.map(alimento => (
                <AlimentacionCards planAlimenticio={alimento} />
            ))
        }
      </div>
    </section>
  );
};

const BotonSelector = ({ text }) => {
  const [seleccionado, setSeleccionado] = useState(false);

  const seleccionar = () => {
    setSeleccionado(!seleccionado);
  };

  return (
    <button onClick={seleccionar} className={`boton-seleccion ${seleccionado ? "seleccionado" : ""}`}>
      {text}
    </button>
  );
};

const AlimentacionCards = ({ planAlimenticio }) => {
    return (
        <div className="tarjeta-alimentacion">
            <img src="https://plus.unsplash.com/premium_photo-1675798983878-604c09f6d154?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Verduras" />
            <div className="tarjeta-informacion">
                <span>Descripcion: </span>
                <p>
                    { planAlimenticio.descripcion }
                </p>
            </div>
        </div>
    )
}

export default Alimentacion;
