import { useRef } from 'react'
import './loader.css'
import { motion } from 'motion/react'

const Loader = () => {
    const referenciaLoader = useRef(null)

    const variantes = {
        inicial: {
            y: -25
        },
        animacion: {
            y: 0
        }
    }
        
    return (
       <motion.div className='loader-principal' ref={referenciaLoader} >
        <div className="loader-main">
            <div className="loader-container">
            <motion.div className="barra1" 
            variants={variantes} 
            initial={"inicial"} 
            animate={"animacion"}
            transition={{repeat: Infinity, repeatType: "reverse", ease: "easeInOut"}}
            ></motion.div>
            <motion.div className="barra2" 
            variants={variantes}
            initial={"inicial"}
            animate={"animacion"} 
            transition={{delay: .05, repeat: Infinity, repeatType: "reverse", ease: "easeInOut"}}
            ></motion.div>
            <motion.div className="barra3" 
            variants={variantes} 
            initial={"inicial"} 
            animate={"animacion"} 
            transition={{delay: .1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut"}}
            ></motion.div>
            <motion.div className="barra4" 
            variants={variantes} 
            initial={"inicial"} 
            animate={"animacion"} 
            transition={{delay: .15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut"}}
            ></motion.div>
            <motion.div className="barra5" 
            variants={variantes} 
            initial={"inicial"} 
            animate={"animacion"} 
            transition={{delay: .20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut"}}
            ></motion.div>
            </div>
            <h3 className="cargando-label">Cargando...</h3>
        </div>
        </motion.div>
    )
}

export default Loader;