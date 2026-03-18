import { useEffect, useLayoutEffect, useState } from "react";
import "./alimentacion.css";
import ModalAlimentacion from "./ModalAlimentacion/ModalAlimentacion";
import { ChevronDown, Plus, Star, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import WarningForm from "../../../shared/ui/WarningForm";

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
      autor: "Martin Cox",
      calificacion: "1 estrella",
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
      autor: "Martin Cox",
      calificacion: "1 estrella",
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
      autor: "Martin Cox",
      calificacion: "1 estrella",
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

  const [warningForm, setWarningForm] = useState(false)
  const [planAlimentacion, setPlanAlimentacion] = useState({
    objetivo: "",
    descripcion: "",
    proteina: "",
    carbohidratos: "",
    grasas: ""
  })

  const actualizarDatosAlimentacion = (ev) => {
    const opcion = ev.target
    setWarningForm(false)
    setPlanAlimentacion({
      ...planAlimentacion,
      [opcion.name]: opcion.value
    })
  }


  const almacenarPlan = async () => {
    if (!comprobarCampos()) return setWarningForm(true)

    const rsp = await fetch('http://localhost:3500/alimentacion', {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(planAlimentacion),
      headers: { "Content-Type": "application/json" }
    })

    closeModalAgregarAlimentacion()
    const respAlimentacion = await rsp.json()
  }

  const comprobarCampos = () => {
    if (!planAlimentacion.carbohidratos ||
      !planAlimentacion.descripcion ||
      !planAlimentacion.grasas ||
      !planAlimentacion.objetivo ||
      !planAlimentacion.proteina
    ) {
      return false
    }
    return true
  }

  const objetivoOpciones = {
    0: { id: 0, valor: "Selecciona una Opcion" },
    1: { id: 1, valor: "Bajar Grasa" },
    2: { id: 2, valor: "Ganar Masa Muscular" },
    3: { id: 3, valor: "Mantenimiento" }
  }

  const carbohidratos = {
    0: { id: 0, valor: "Selecciona una Opcion" },
    1: { id: 1, valor: "Bajo" },
    2: { id: 2, valor: "Medio" },
    3: { id: 3, valor: "Alto" }
  }

  const grasas = {
    0: {id: 0, valor: "Selecciona una opcion"},
    1: { id: 1, valor: "Bajo" },
    2: { id: 2, valor: "Medio" },
    3: { id: 3, valor: "Alto" }
  }

  const recomendaciones = []

  const comidas = []

  return (
    <section className="modal-alimentacion flex-center">
      <X className="close-modal" width={29} height={29} onClick={closeModalAgregarAlimentacion} />
      <div className="modal-alimentacion-contenido agregar-plan">
        <AnimatePresence>
          {warningForm && <WarningForm />}
        </AnimatePresence>
        <span className="modal-alimentacion-agregar-titulo">Agregar Plan</span>

        <div class="grid-container">
          <div className="objetivo">
            <label htmlFor="">Objetivo: </label>
            <DropMenu opciones={objetivoOpciones} />
          </div>
          <div className="carbohidratos">
            <label htmlFor="">Carbohidratos</label>
            <DropMenu opciones={carbohidratos} />
          </div>
          <div className="grasas">
            <label htmlFor="">Grasas</label>
            <DropMenu opciones={grasas} />
          </div>

          <div className="descripcion">
            <textarea name="" id=""></textarea>
          </div>
        </div>
        {/* <div className="form-agregar-alimentacion">
          <div>
            <div className="form-agregar-alimentacion-objetivo">
              <label>Objetivo: </label>
              <select name="objetivo" id="" onChange={actualizarDatosAlimentacion}>
                <option value="" disabled selected>Selecciona una opcion</option>
                <option value="Mantenimiento">Mantenimiento</option>
                <option value="Bajar grasa">Bajar grasa</option>
                <option value="Ganar masa muscular">Ganar masa muscular</option>
              </select>
            </div>
          </div>

          <div className="form-agregar-alimentacion-macros">
            <label>Proteina: </label>
            <select name="proteina" id="" onChange={actualizarDatosAlimentacion}>
              <option value="" disabled selected>Selecciona una opcion</option>
              <option value="baja">Baja</option>
              <option value="medio">Medio</option>
              <option value="media alta">Media Alta</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div className="form-agregar-alimentacion-macros">
            <label>Carbohidratos: </label>
            <select name="carbohidratos" id="" onChange={actualizarDatosAlimentacion}>
              <option value="" disabled selected>Selecciona una opcion</option>
              <option value="baja">Baja</option>
              <option value="medio">Medio</option>
              <option value="media alta">Media Alta</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div className="form-agregar-alimentacion-macros">
            <label>Grasas: </label>
            <select name="grasas" id="" onChange={actualizarDatosAlimentacion}>
              <option value="" disabled selected>Selecciona una opcion</option>
              <option value="baja">Baja</option>
              <option value="medio">Medio</option>
              <option value="media alta">Media Alta</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div className="form-agregar-alimentacion-descripcion">
            <label >Descripcion: </label>
            <textarea name="descripcion" onChange={actualizarDatosAlimentacion} />
          </div>
        </div>
        </div> */}

        <div className="form-agregar-alimentacion-botones flex-center">
          <button onClick={closeModalAgregarAlimentacion}>Cerrar</button>
          <button onClick={almacenarPlan}>Aceptar</button>
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
      <div className="tarjeta-informacion">
        <span>{planAlimenticio.objetivo} </span>
        <p>{planAlimenticio.autor}</p>
        <p><Star stroke="orange" width={18} /><Star stroke="orange" width={18} /><Star stroke="orange" width={18} /><Star stroke="orange" width={18} /><Star stroke="orange" width={18} /> </p>
      </div>
    </div>
  );
};

export default Alimentacion;

// Componente Para la Seleccion.

const DropMenu = ({ opciones }) => {
  const [mostrardDrop, setMostrarDrop] = useState(false);
  const [valor, setValor] = useState(0)

  const cambiarValor = (ev) => {
    const valorEvento = ev?.target.value
    setValor(opciones[valorEvento].valor)
  }

  useLayoutEffect(() => {
    setValor(opciones[0].valor)
  }, [])

  return (
    <div className="drop-menu">
      <div className="drop-menu-title">
        <button className="drop-menu-text" onClick={() => setMostrarDrop(!mostrardDrop)}>{valor}</button>
        <ChevronDown className="drop-menu-text" onClick={() => setMostrarDrop(!mostrardDrop)} />
      </div>
      <div className={`drop-menu-context ${mostrardDrop ? "drop-shown" : ""}`}>
        {
          Object.values(opciones).map((item) => (
            <button onClick={cambiarValor} value={item.id}>{item.valor}</button>
          ))
        }
      </div>
    </div>
  )
}