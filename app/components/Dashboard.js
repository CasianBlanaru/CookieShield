'use client';

import { useState, useEffect } from 'react';
import { fetchSettings, saveSettings } from '../lib/api';
import Image from 'next/image';

export default function Dashboard({ token, onLogout }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saveStatus, setSaveStatus] = useState({ status: '', message: '' });

  // Einstellungen laden
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const data = await fetchSettings(token);
        setSettings(data);
        setError('');
      } catch (err) {
        setError('Fehler beim Laden der Einstellungen. Bitte versuche es später erneut.');
        console.error('Fehler beim Laden:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadSettings();
    }
  }, [token]);

  // Einstellungen speichern
  const handleSaveSettings = async () => {
    try {
      setSaveStatus({ status: 'loading', message: 'Einstellungen werden gespeichert...' });
      await saveSettings(settings, token);
      setSaveStatus({ status: 'success', message: 'Einstellungen erfolgreich gespeichert!' });
      
      // Nach 3 Sekunden die Erfolgsmeldung ausblenden
      setTimeout(() => {
        setSaveStatus({ status: '', message: '' });
      }, 3000);
    } catch (err) {
      setSaveStatus({ status: 'error', message: 'Fehler beim Speichern der Einstellungen.' });
      console.error('Fehler beim Speichern:', err);
    }
  };

  // Toggle für Cookie-Kategorien
  const handleToggleCategory = (categoryId) => {
    if (!settings) return;
    
    const updatedSettings = {
      ...settings,
      categories: settings.categories.map(category => 
        category.id === categoryId 
          ? { ...category, enabled: !category.enabled } 
          : category
      )
    };
    
    setSettings(updatedSettings);
  };

  // Aktualisierung von Design-Einstellungen
  const handleDesignChange = (e) => {
    if (!settings) return;
    
    const { name, value } = e.target;
    setSettings({
      ...settings,
      design: {
        ...settings.design,
        [name]: value
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg shadow-sm text-center">
        <div className="text-red-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-red-800 mb-2">Fehler beim Laden</h3>
        <p className="text-red-700">{error}</p>
        <button 
          onClick={onLogout}
          type="button"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Abmelden
        </button>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg shadow-sm text-center">
        <p className="text-gray-700">Keine Einstellungen verfügbar.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image 
              src="/round-logo.svg" 
              alt="CookieShield Logo" 
              width={48} 
              height={48} 
              className="bg-white p-1 rounded-full shadow-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">CookieShield Dashboard</h1>
              <p className="text-indigo-100">Verwalte deine Cookie-Einstellungen</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            type="button"
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md text-sm font-medium transition-all"
          >
            Abmelden
          </button>
        </div>
      </div>

      {/* Inhalt */}
      <div className="p-6">
        {/* Erfolgsmeldung oder Fehlermeldung beim Speichern */}
        {saveStatus.message && (
          <div className={`mb-6 p-4 rounded-md ${
            saveStatus.status === 'error' 
              ? 'bg-red-50 border-l-4 border-red-500 text-red-700' 
              : saveStatus.status === 'success'
                ? 'bg-green-50 border-l-4 border-green-500 text-green-700'
                : 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
          }`}>
            <div className="flex">
              {saveStatus.status === 'error' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : saveStatus.status === 'success' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 animate-spin" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              )}
              <span>{saveStatus.message}</span>
            </div>
          </div>
        )}

        {/* Cookie-Kategorien */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Cookie-Kategorien</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            {settings.categories?.map((category) => (
              <div key={category.id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                <div>
                  <h3 className="font-medium text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={category.enabled}
                    onChange={() => handleToggleCategory(category.id)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Design-Einstellungen */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Design-Einstellungen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="primary_color" className="block text-sm font-medium text-gray-700 mb-1">
                Primärfarbe
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  id="primary_color"
                  name="primary_color"
                  value={settings.design?.primary_color || '#4361ee'}
                  onChange={handleDesignChange}
                  className="h-10 w-10 border border-gray-300 rounded mr-2"
                />
                <input
                  type="text"
                  value={settings.design?.primary_color || '#4361ee'}
                  onChange={handleDesignChange}
                  name="primary_color"
                  className="w-full p-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="text_color" className="block text-sm font-medium text-gray-700 mb-1">
                Textfarbe
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  id="text_color"
                  name="text_color"
                  value={settings.design?.text_color || '#333333'}
                  onChange={handleDesignChange}
                  className="h-10 w-10 border border-gray-300 rounded mr-2"
                />
                <input
                  type="text"
                  value={settings.design?.text_color || '#333333'}
                  onChange={handleDesignChange}
                  name="text_color"
                  className="w-full p-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="background_color" className="block text-sm font-medium text-gray-700 mb-1">
                Hintergrundfarbe
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  id="background_color"
                  name="background_color"
                  value={settings.design?.background_color || '#ffffff'}
                  onChange={handleDesignChange}
                  className="h-10 w-10 border border-gray-300 rounded mr-2"
                />
                <input
                  type="text"
                  value={settings.design?.background_color || '#ffffff'}
                  onChange={handleDesignChange}
                  name="background_color"
                  className="w-full p-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="corner_radius" className="block text-sm font-medium text-gray-700 mb-1">
                Eckenradius (px)
              </label>
              <input
                type="number"
                id="corner_radius"
                name="corner_radius"
                value={settings.design?.corner_radius || 8}
                onChange={handleDesignChange}
                min="0"
                max="24"
                className="w-full p-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
        
        {/* Speichern-Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            disabled={saveStatus.status === 'loading'}
            type="button"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saveStatus.status === 'loading' ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Wird gespeichert...
              </>
            ) : (
              'Einstellungen speichern'
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 