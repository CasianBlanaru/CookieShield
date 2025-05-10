'use client';

import { useRouter } from 'next/navigation';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegistrationSuccess = () => {
    // Erfolgsmeldung anzeigen und zur Login-Seite weiterleiten
    alert('Registrierung erfolgreich! Bitte melde dich jetzt an.');
    router.push('/login');
  };

  return (
    <main className="bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <RegisterForm onRegistrationSuccess={handleRegistrationSuccess} />
    </main>
  );
} 