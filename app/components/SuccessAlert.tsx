'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessAlertProps {
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

export default function SuccessAlert({
  message,
  onClose,
  autoClose = true,
  autoCloseTime = 5000
}: SuccessAlertProps) {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose, autoCloseTime]);

  return (
    <AnimatePresence>
      <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 30,
            duration: 0.4 
          }}
          className="bg-white dark:bg-gray-800 shadow-xl mx-4 rounded-lg w-full max-w-md overflow-hidden"
        >
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-1" />
          <div className="p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <div className="flex justify-center items-center bg-green-100 rounded-full w-10 h-10">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <title>Häkchen Symbol</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </motion.div>
              </div>
              <div className="flex-1 ml-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="font-medium text-gray-900 dark:text-white text-lg">Erfolg!</h3>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-2"
                >
                  <p className="text-gray-600 dark:text-gray-300">{message}</p>
                </motion.div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 shadow-sm px-4 py-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-white text-sm"
              >
                OK
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
} 