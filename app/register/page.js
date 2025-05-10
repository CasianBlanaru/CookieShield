'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegisterForm from '../components/RegisterForm';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegisterPage() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRegistrationSuccess = () => {
    // Zeige animierte Erfolgsmeldung an
    setShowSuccess(true);
    
    // Nach 3 Sekunden zur Login-Seite weiterleiten
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  };

  return (
    <main className="bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen relative">
      <RegisterForm onRegistrationSuccess={handleRegistrationSuccess} />
      
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-2xl p-6 max-w-md mx-4 text-center"
              initial={{ scale: 0.8, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <motion.div 
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ times: [0, 0.6, 1] }}
              >
                <svg 
                  className="w-8 h-8 text-green-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Erfolgs-Checkmark"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <motion.h3 
                className="text-xl font-bold mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Registrierung erfolgreich!
              </motion.h3>
              <motion.p
                className="text-gray-600 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Du wirst in wenigen Sekunden zum Login weitergeleitet.
              </motion.p>
              <motion.div 
                className="h-1 bg-gray-200 rounded-full overflow-hidden mt-4"
                initial={{ width: "100%" }}
              >
                <motion.div 
                  className="h-full bg-indigo-600"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
} 