import { useEffect, useState } from "react";
import "./alimentacion.css";
import ModalAlimentacion from "./ModalAlimentacion/ModalAlimentacion";
import { Plus, X } from "lucide-react";

const Alimentacion = () => {
  const [filtro, setFiltro] = useState([]);
  const [alimentoSeleccionado, setAlimentoSeleccionado] = useState(null);
  const [esModalAgregarAlimentacionVisible, setModalAgregarAlimentacionVisible] = useState(false);

  const editarAlimento = (alimento) => {
    setAlimentoSeleccionado(alimento);
  };

  const closeModalAlimentacion = () => {
    setAlimentoSeleccionado(null);
  };

  const closeModalAgregarAlimentacion = () => {
    setModalAgregarAlimentacionVisible(false);
  }

  // Este array contiene los planes de alimentacion.
  const alimentacion = [
    {
      id: 1,
      objetivo: "Bajar grasa",
      descripcion:
        "Déficit calórico moderado enfocado en conservar masa muscular.",
      macros: {
        proteina: "alta",
        carbohidratos: "Media baja",
        grasas: "Media baja",
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
      id: 3,
      objetivo: "Ganar masa muscular",
      descripcion: "Superávit calórico enfocado en el crecimiento muscular.",
      macros: {
        proteina: "Alta",
        carbohidratos: "Alta",
        grasas: "Media",
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
        proteina: "Media alta",
        carbohidratos: "Media",
        grasas: "Media",
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

  const [copiaAlimentacion, setCopiaAlimentacion] = useState([])

  const filtrarAlimentacion = (plan) => {
    if (filtro.includes(plan)) {
      setFiltro(filtro.filter((item) => item !== plan));
    } else {
      setFiltro([...filtro, plan]);
    }
  };

  useEffect(() => {
    if (filtro.length === 0) {
      setCopiaAlimentacion([...alimentacion])
      return;
    }
    setCopiaAlimentacion(alimentacion.filter(item => filtro.includes(item.objetivo)))
  }, [filtro])


  return (
    <section className="contenedor alimentacion">
      <div className="alimentacion-objetivos">
        <BotonSelector agregarFiltro={filtrarAlimentacion} text={"Bajar grasa"} />
        <BotonSelector agregarFiltro={filtrarAlimentacion} text={"Ganar masa muscular"} />
        <BotonSelector agregarFiltro={filtrarAlimentacion} text={"Mantenimiento"} />
      </div>

      <div className="alimentacion-tarjetas">
        {copiaAlimentacion.map((alimento) => (
          <AlimentacionCards
            key={alimento.id}
            planAlimenticio={alimento}
            accion={editarAlimento}
          />
        ))}
      </div>
      {alimentoSeleccionado && (
        <ModalAlimentacion
          alimentacion={alimentoSeleccionado}
          accion={closeModalAlimentacion}
        />
      )}
      {
        esModalAgregarAlimentacionVisible && <ModalAgregarAlimentacion closeModalAgregarAlimentacion={closeModalAgregarAlimentacion} />
      }

      <button className="agregar-alimentacion flex-center" onClick={() => setModalAgregarAlimentacionVisible(true)}>
        <span>Agregar Plan</span>
        <Plus width={15} />
      </button>
    </section>
  );
};

const ModalAgregarAlimentacion = ({ closeModalAgregarAlimentacion }) => {

  const [planAlimentacion, setPlanAlimentacion] = useState({
    objetivo: "",
    descripcion: "",
    proteina: "",
    carbohidratos: "",
    grasas: ""
  })

  const actualizarDatosAlimentacion = (ev) => {
    const opcion = ev.target

    setPlanAlimentacion({
      ...planAlimentacion,
      [opcion.name]: opcion.value
    })

    console.log(planAlimentacion)
  }

  return (
    <section className="modal-alimentacion">
      <X className="close-modal" width={29} height={29} onClick={closeModalAgregarAlimentacion} />
      <div className="modal-alimentacion-contenido">
        <span className="modal-alimentacion-agregar-titulo">Agregar Plan</span>

        <div className="form-agregar-alimentacion">
          <div className="form-agregar-alimentacion-objetivo">
            <label>Objetivo: </label>
            <select name="objetivo" id="" onChange={actualizarDatosAlimentacion}>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="Bajar grasa">Bajar grasa</option>
              <option value="Ganar masa muscular">Ganar masa muscular</option>
            </select>
          </div>

          <div className="form-agregar-alimentacion-descripcion">
            <label >Descripcion: </label>
            <textarea name="descripcion" onChange={actualizarDatosAlimentacion} />
          </div>

          <div className="form-agregar-alimentacion-macros">
            <span>Nutrientes: </span>
            <label>Proteina: </label>
            <select name="proteina" id="" onChange={actualizarDatosAlimentacion}>
              <option value="baja">Baja</option>
              <option value="medio">Medio</option>
              <option value="media alta">Media Alta</option>
              <option value="alta">Alta</option>
            </select>
            <label>Carbohidratos: </label>
            <select name="carbohidratos" id="" onChange={actualizarDatosAlimentacion}>
              <option value="baja">Baja</option>
              <option value="medio">Medio</option>
              <option value="media alta">Media Alta</option>
              <option value="alta">Alta</option>
            </select>
            <label>Grasas: </label>
            <select name="grasas" id="" onChange={actualizarDatosAlimentacion}>
              <option value="baja">Baja</option>
              <option value="medio">Medio</option>
              <option value="media alta">Media Alta</option>
              <option value="alta">Alta</option>
            </select>
          </div>
        </div>
        <div className="form-agregar-alimentacion-botones flex-center">
          <button onClick={closeModalAgregarAlimentacion}>Cerrar</button>
          <button>Aceptar</button>
        </div>
      </div>
    </section>
  )
}




const BotonSelector = ({ text, agregarFiltro }) => {
  const [seleccionado, setSeleccionado] = useState(false);

  const seleccionar = () => {
    setSeleccionado(!seleccionado);
    agregarFiltro(text)
  };

  return (
    <button
      onClick={seleccionar}
      className={`boton-seleccion ${seleccionado ? "seleccionado" : ""}`}
    >
      {text}
    </button>
  );
};

const AlimentacionCards = ({ planAlimenticio, accion }) => {
  const seleccionarAlimento = () => {
    accion(planAlimenticio);
  };

  return (
    <div className="tarjeta-alimentacion" onClick={seleccionarAlimento}>
      <img
        src="https://plus.unsplash.com/premium_photo-1675798983878-604c09f6d154?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Verduras"
      />
      <div className="tarjeta-informacion">
        <span>Descripcion: </span>
        <p>{planAlimenticio.descripcion}</p>
      </div>
    </div>
  );
};

export default Alimentacion;
