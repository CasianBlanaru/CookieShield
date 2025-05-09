'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);

  // Animation effect on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4 min-h-screen">
      <div className={`max-w-md w-full transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="mb-8 text-center">
          <div className="relative mx-auto mb-4 w-24 h-24">
            <div className="absolute inset-0 bg-blue-100 opacity-50 rounded-full animate-ping" />
            <div className="relative flex justify-center items-center bg-white shadow-lg rounded-full w-24 h-24">
              <span className="font-bold text-blue-600 text-5xl">404</span>
            </div>
          </div>
          <h1 className="mb-2 font-bold text-gray-800 text-3xl">Page Not Found</h1>
          <p className="mb-8 text-gray-600">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="bg-white shadow-xl p-8 rounded-xl">
          <div className="space-y-6">
            <div className="flex items-center bg-blue-50 p-4 border border-blue-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" title="Information">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-700 text-sm">
                The dashboard or banner configuration you&apos;re looking for might have been moved or deleted.
              </p>
            </div>

            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              <Link href="/" className="flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-md p-4 border border-gray-200 hover:border-blue-300 rounded-lg transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="mb-2 w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" title="Home">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-medium text-gray-700 text-sm">Go to Dashboard</span>
              </Link>

              <Link href="/login" className="flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-md p-4 border border-gray-200 hover:border-blue-300 rounded-lg transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="mb-2 w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" title="Login">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span className="font-medium text-gray-700 text-sm">Login</span>
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-6 border-gray-100 border-t text-center">
            <p className="text-gray-500 text-sm">
              If you believe this is an error, please contact the site administrator.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} CookieShield</p>
        </div>
      </div>
    </div>
  );
} 