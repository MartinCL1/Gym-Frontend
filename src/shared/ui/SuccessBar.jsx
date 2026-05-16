import React from 'react';
import { motion } from 'motion/react';

const SuccessBar = ({ message = 'Acción completada con éxito', visible = false }) => {
  if (!visible) return null;

  return (
    <motion.div
      className="mx-auto flex items-center gap-3 rounded-full bg-emerald-100 p-2 text-emerald-800 font-semibold shadow-[0_10px_30px_rgba(16,185,129,0.2)] max-w-full fixed bottom-0"
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white text-sm">
        ✓
      </span>
      <span>{message}</span>
    </motion.div>
  );
};

export default SuccessBar;
