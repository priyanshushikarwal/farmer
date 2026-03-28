import React from 'react';
import { motion } from 'framer-motion';

const LoadingOverlay: React.FC<{ message: string }> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="relative w-24 h-24 mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 border-green-100 rounded-full"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 border-t-green-600 rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-4 h-4 bg-green-600 rounded-full"
          />
        </div>
      </div>
      <h3 className="text-xl font-black text-gray-900 mb-2">{message}</h3>
      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Krishi Sahayak</p>
    </motion.div>
  );
};

export default LoadingOverlay;
