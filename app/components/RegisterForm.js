'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { register } from '../lib/api';
import { motion } from 'framer-motion';

export default function RegisterForm({ onRegistrationSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (password !== passwordConfirmation) {
        throw new Error('Die Passwörter stimmen nicht überein.');
      }

      await register(name, email, password, passwordConfirmation);
      if (onRegistrationSuccess) {
        onRegistrationSuccess();
      }
    } catch (error) {
      setError(error.message || 'Registrierung fehlgeschlagen. Bitte versuche es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <motion.div 
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="bg-white backdrop-blur-sm bg-opacity-80 p-8 rounded-2xl shadow-xl border border-gray-100"
          variants={itemVariants}
        >
          <motion.div 
            className="text-center mb-8"
            variants={itemVariants}
          >
            <motion.div 
              className="flex justify-center mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image 
                src="/logo.svg" 
                alt="CookieShield Logo" 
                width={64}
                height={64}
                className="w-24 h-24 drop-shadow-md"
              />
            </motion.div>
            <motion.h1 
              className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Registrieren
            </motion.h1>
            <motion.p 
              className="text-sm text-gray-500 mt-1"
              variants={itemVariants}
            >
              Erstelle ein Konto für das Cookie Dashboard
            </motion.p>
          </motion.div>
          
          {error && (
            <motion.div 
              className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-xl shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-label="Fehlermeldung">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit}>
            <motion.div 
              className="mb-4"
              variants={itemVariants}
            >
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 text-gray-900 bg-white bg-opacity-90 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                required
                placeholder="Dein Name"
              />
            </motion.div>

            <motion.div 
              className="mb-4"
              variants={itemVariants}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 text-gray-900 bg-white bg-opacity-90 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                required
                placeholder="deine.email@beispiel.de"
              />
            </motion.div>
            
            <motion.div 
              className="mb-4"
              variants={itemVariants}
            >
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Passwort
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 text-gray-900 bg-white bg-opacity-90 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                required
                placeholder="••••••••"
                minLength="8"
              />
            </motion.div>

            <motion.div 
              className="mb-6"
              variants={itemVariants}
            >
              <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700 mb-1">
                Passwort bestätigen
              </label>
              <input
                id="passwordConfirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full p-3 text-gray-900 bg-white bg-opacity-90 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                required
                placeholder="••••••••"
                minLength="8"
              />
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-medium shadow-md transition-all"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Registrierung läuft...
                  </span>
                ) : (
                  'Registrieren'
                )}
              </button>
            </motion.div>
            
            <motion.div 
              className="mt-6 text-center"
              variants={itemVariants}
            >
              <p className="text-sm text-gray-600">
                Bereits registriert?{' '}
                <Link 
                  href="/login" 
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  Zum Login
                </Link>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
} 