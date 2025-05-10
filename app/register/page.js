'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegisterForm from '../components/RegisterForm';
import SuccessAlert from '../components/SuccessAlert';

export default function RegisterPage() {
  const router = useRouter();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleRegistrationSuccess = () => {
    // Erfolgsmeldung anzeigen und später zur Login-Seite weiterleiten
    setShowSuccessAlert(true);
  };

  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
    router.push('/login');
  };

  return (
    <main className="bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <RegisterForm onRegistrationSuccess={handleRegistrationSuccess} />
      
      {showSuccessAlert && (
        <SuccessAlert 
          message="Registrierung erfolgreich! Bitte melde dich jetzt an."
          onClose={handleCloseAlert}
          autoClose={true}
          autoCloseTime={3000}
        />
      )}
    </main>
  );
} 