'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CookieDashboard from './components/CookieDashboard.js';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Überprüfe, ob ein Token vorhanden ist
    const token = localStorage.getItem('auth_token');
    if (!token) {
      // Wenn kein Token vorhanden ist, zur Login-Seite weiterleiten
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <main className="flex justify-center items-center bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
        <div className="border-indigo-500 border-t-2 border-b-2 rounded-full w-12 h-12 animate-spin" />
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      {isAuthenticated && <CookieDashboard />}
    </main>
  );
}