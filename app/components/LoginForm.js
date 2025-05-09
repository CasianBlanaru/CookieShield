'use client';

import { useState } from 'react';

export default function LoginForm({ onLogin, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onLogin(email, password);
    } catch {
      // Fehler wird bereits in onLogin behandelt
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f8fafc]">
      <div className="w-full max-w-md fade-in">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src="/round-logo.svg" 
                alt="CookieShield Logo" 
                className="w-16 h-16" 
                style={{ 
                  filter: "brightness(0.95) contrast(1.05)",
                  maxWidth: "64px",
                  height: "auto"
                }} 
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Cookie Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your cookie consent settings</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md slide-up">
              <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
                placeholder="admin@example.com"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-md font-medium transition-colors"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 text-center slide-up">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Demo Credentials</h3>
              <div className="bg-gray-50 py-2 px-3 rounded-md inline-block text-sm font-mono text-gray-600">
                admin@example.com / password
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}