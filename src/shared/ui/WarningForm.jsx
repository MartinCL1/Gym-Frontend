import { motion   } from 'motion/react'

const WarningForm = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, top: "2%" }} exit={{ opacity: 0, top: "0%" }} className="modal-warning"> LLena todos los campos </motion.div>
  )
}

export default WarningForm;