'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../components/LoginForm';
import { login } from '../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = async (email, password) => {
    try {
      const token = await login(email, password);
      // Token im localStorage speichern
      localStorage.setItem('auth_token', token);
      // Zur Hauptseite weiterleiten
      router.push('/');
    } catch {
      setError('Login fehlgeschlagen. Bitte überprüfe deine Anmeldedaten.');
    }
  };

  return (
    <main className="bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <LoginForm onLogin={handleLogin} error={error} />
    </main>
  );
} 