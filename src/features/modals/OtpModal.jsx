import { input } from "motion/react-client";
import { Dialog, unstable_OneTimePasswordField as OTP } from "radix-ui";
import { useRef, useState } from "react";
import { confirmarCodigo } from "../../services/registro.services";
import { X } from "lucide-react";

const OtpModal = ( {cerrarModal, credenciales, setUsuarioCreado} ) => {
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef(['', '', '', '', '', '']);

  const handleChange = (e, index) => {
    const newCodigo = [...codigo];
    if ( e.target.value.length > 1 ) return; // Evita a que se ingresen mas de un digito en cada input.
    newCodigo[index] = e.target.value;
    setCodigo(newCodigo);
    if (e.target.value.length > 0 ) {
      inputRefs?.current[index + 1]?.focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && codigo[index] === '') {
      inputRefs?.current[index - 1]?.focus();
    }
  }

  const confirmarOtp = async () => {
    const oneTimePin = codigo.join('');
    const respuesta = await confirmarCodigo(oneTimePin, credenciales)
    if(respuesta.respuesta) {
      cerrarModal()
      setUsuarioCreado(true)
      setTimeout(()=> {setUsuarioCreado(false)}, 1000)
    }
  }

  return (
    <div className="text-white p-6 w-[90%] max-w-96 rounded-lg shadow-lg flex flex-col justify-center items-center gap-10">
      <h2 className="w-full text-center text-1xl">Ingrese el código OTP</h2>
      <X onClick={cerrarModal} className="absolute right-12 top-10 cursor-pointer transition duration-100 hover:transform hover:scale-110" />
      <div className="w-[90%] mt-4 flex justify-between gap-4">
        {
          inputRefs.current.map((element, index) => (
            <input id={index} type="text" ref={(el) => inputRefs.current[index] = el} onKeyDown={(e) => handleKeyDown(e, index)} value={codigo[index]} name={`otp${index}`} onChange={(e) => handleChange(e, index)} className="border-b text-white w-1/6 text-center" />
          ))
        }
      </div>
      <button className="text-white flex font-bold" onClick={confirmarOtp}>
        Verificar
      </button>
    </div>
  )
}

export default OtpModal;
