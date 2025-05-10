'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegisterForm from '../components/RegisterForm';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegisterPage() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRegistrationSuccess = () => {
    // Show animated success message
    setShowSuccess(true);
  };
  
  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <main className="bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen relative">
      <RegisterForm onRegistrationSuccess={handleRegistrationSuccess} />
      
      <AnimatePresence>
        {showSuccess && (
          <>
            {/* Toast notification */}
            <motion.div 
              className="toast toast-success"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Registrierung erfolgreich!</span>
              </div>
            </motion.div>
            
            {/* Modal overlay with message */}
            <motion.div 
              className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-4 text-center relative overflow-hidden"
                initial={{ scale: 0.8, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 15 }}
              >
                {/* Background design element */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-100/40 to-purple-100/40 blur-3xl -translate-y-20 translate-x-20 rounded-full" />
                
                <motion.div 
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center relative z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ times: [0, 0.6, 1] }}
                >
                  <svg 
                    className="w-10 h-10 text-green-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <title>Success icon</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold mb-3 text-gray-800 relative z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Registrierung erfolgreich!
                </motion.h3>
                
                <motion.p
                  className="text-gray-600 mb-6 relative z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Dein Konto wurde erfolgreich erstellt. Bitte melde dich jetzt an, um fortzufahren.
                </motion.p>
                
                <motion.button
                  onClick={handleLoginRedirect}
                  className="futuristic-button px-8 py-3 text-base font-medium rounded-xl text-white shadow-lg relative z-10 w-full sm:w-auto"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Ok
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
} 