import { motion } from 'motion/react'

const LoaderForm = () => {
    <motion.div className='loader-form' initial={{ opacity: 0 }} animate={{ opacity: 1, top: "2%" }} exit={{ opacity: 0, top: "0%" }}>
        Cargando
    </motion.div>
}

export default LoaderForm;