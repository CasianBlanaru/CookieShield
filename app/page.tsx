'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from './components/Dashboard';

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Überprüfe, ob ein Token vorhanden ist
    const authToken = localStorage.getItem('auth_token');
    if (!authToken) {
      // Wenn kein Token vorhanden ist, zur Login-Seite weiterleiten
      router.push('/login');
    } else {
      setToken(authToken);
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    router.push('/login');
  };

  if (isLoading) {
    return (
      <main className="flex justify-center items-center bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
        <div className="border-indigo-500 border-t-2 border-b-2 rounded-full w-12 h-12 animate-spin" />
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:p-6 md:p-8 min-h-screen">
      <div className="mx-auto max-w-7xl">
        {token && <Dashboard token={token} onLogout={handleLogout} />}
      </div>
    </main>
  );
}