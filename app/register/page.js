'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegisterForm from '../components/RegisterForm';
import SuccessAlert from '../components/SuccessAlert';

export default function RegisterPage() {
  const router = useRouter();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleRegistrationSuccess = () => {
    // Display success message before redirecting to login page
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
          message="Registration successful! Please sign in now."
          onClose={handleCloseAlert}
          autoClose={true}
          autoCloseTime={3000}
        />
      )}
    </main>
  );
} 