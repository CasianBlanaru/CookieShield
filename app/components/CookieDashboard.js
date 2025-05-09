'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import BannerPreview from './BannerPreview';
import LoginForm from './LoginForm';
import { fetchSettings, saveSettings, login } from '../lib/api';

const defaultSettings = {
  bannerMessage: 'We use cookies to enhance your experience. By continuing, you agree to our use of cookies.',
  acceptAllLabel: 'Accept All',
  denyAllLabel: 'Deny All',
  settingsLabel: 'Cookie Settings',
  saveLabel: 'Save Settings',
  consentLifetime: 31536000, // 1 year in seconds
  categories: ['necessary', 'performance', 'functional', 'advertising'],
  bannerPosition: 'left',
  bannerBgColor: '#ffffff',
  bannerTextColor: '#333333',
  buttonBgColor: '#3b82f6',
  buttonTextColor: '#ffffff',
  linkColor: '#e97040', // Setting for link color
  activeColor: '#e97040', // Setting for active elements color
  // Tab text settings
  settingsTabLabel: 'Einstellungen',
  cookiesTabLabel: 'Cookies',
  policyTabLabel: 'Cookie-Richtlinie',
  myDataTabLabel: 'Meine Daten',
  // New settings
  forcedLang: '',
  bannerStyle: 'side', // 'side' or 'full'
  translations: {
    de: {
      language: 'Deutsch',
      bannerMessage: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Wenn Sie fortfahren, stimmen Sie der Verwendung von Cookies zu.',
      acceptAllLabel: 'Alle akzeptieren',
      denyAllLabel: 'Alle ablehnen',
      settingsLabel: 'Cookie-Einstellungen',
      saveLabel: 'Einstellungen speichern',
      weUseCookies: 'Wir verwenden Cookies',
      customize: 'Anpassen',
      reject: 'Ablehnen',
      acceptAll: 'Alle akzeptieren',
      necessary: 'Notwendig',
      performance: 'Performance',
      functional: 'Funktional',
      advertising: 'Werbung',
      privacyTerms: 'Datenschutzbestimmungen | Impressum',
      settings: 'Einstellungen',
      cookies: 'Cookies',
      cookiePolicy: 'Cookie-Richtlinie',
      myData: 'Meine Daten',
      cookieList: 'Cookie Liste',
      cookieListDescription: 'Hier finden Sie eine detaillierte Liste aller Cookies, die wir auf unserer Website verwenden.',
      necessaryCookies: 'Notwendige Cookies',
      cookieDescription: 'Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie unsere Website besuchen.',
      gdprRights: 'Nach der DSGVO haben Sie ein Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten.',
      requestData: 'Meine Daten anfordern'
    },
    fr: {
      language: 'Français',
      bannerMessage: 'Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre utilisation des cookies.',
      acceptAllLabel: 'Tout accepter',
      denyAllLabel: 'Tout refuser',
      settingsLabel: 'Paramètres des cookies',
      saveLabel: 'Enregistrer les paramètres',
      weUseCookies: 'Nous utilisons des cookies',
      customize: 'Personnaliser',
      reject: 'Refuser',
      acceptAll: 'Tout accepter',
      necessary: 'Nécessaire',
      performance: 'Performance',
      functional: 'Fonctionnel',
      advertising: 'Publicité',
      privacyTerms: 'Politique de confidentialité | Mentions légales',
      settings: 'Paramètres',
      cookies: 'Cookies',
      cookiePolicy: 'Politique de cookies',
      myData: 'Mes données',
      cookieList: 'Liste des cookies',
      cookieListDescription: 'Voici une liste détaillée de tous les cookies que nous utilisons sur notre site web.',
      necessaryCookies: 'Cookies nécessaires',
      cookieDescription: 'Les cookies sont de petits fichiers texte qui sont stockés sur votre appareil lorsque vous visitez notre site web.',
      gdprRights: 'Selon le RGPD, vous avez le droit d\'accéder, de rectifier et de supprimer vos données.',
      requestData: 'Demander mes données'
    },
    en: {
      language: 'English',
      bannerMessage: 'We use cookies to enhance your experience. By continuing, you agree to our use of cookies.',
      acceptAllLabel: 'Accept All',
      denyAllLabel: 'Deny All',
      settingsLabel: 'Cookie Settings',
      saveLabel: 'Save Settings',
      weUseCookies: 'We use cookies',
      customize: 'Customize',
      reject: 'Reject',
      acceptAll: 'Accept All',
      necessary: 'Necessary',
      performance: 'Performance',
      functional: 'Functional',
      advertising: 'Advertising',
      privacyTerms: 'Privacy Policy | Imprint',
      settings: 'Settings',
      cookies: 'Cookies',
      cookiePolicy: 'Cookie Policy',
      myData: 'My Data',
      cookieList: 'Cookie List',
      cookieListDescription: 'Here you can find a detailed list of all cookies we use on our website.',
      necessaryCookies: 'Necessary Cookies',
      cookieDescription: 'Cookies are small text files that are stored on your device when you visit our website.',
      gdprRights: 'According to GDPR, you have the right to access, rectify and delete your data.',
      requestData: 'Request my data'
    }
  },
  // Design extensions
  fontFamily: 'Inter, sans-serif',
  buttonBorderRadius: '4',
  bannerAnimation: 'fade',
};

export default function CookieDashboard() {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('text');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Load settings
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    
    // Load local settings, regardless of authentication status
    const storedSettings = localStorage.getItem('banner_settings');
    let localSettings = {};
    
    if (storedSettings) {
      try {
        localSettings = JSON.parse(storedSettings);
        console.log('Local settings loaded:', localSettings);
      } catch (err) {
        console.error('Error parsing local settings:', err);
      }
    }
    
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      fetchSettings(storedToken)
        .then(data => {
          // Combine API data with local settings with priority for local settings
          const mergedSettings = { ...defaultSettings, ...data, ...localSettings };
          setSettings(mergedSettings);
          console.log('Combined settings:', mergedSettings);
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to load settings');
          // Still apply local settings
          setSettings({ ...defaultSettings, ...localSettings });
          setLoading(false);
          console.error(err);
        });
    } else {
      // Also load local settings without token
      setSettings({ ...defaultSettings, ...localSettings });
      setLoading(false);
    }
  }, []);

  // Display toast message
  const displayToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Login handler
  const handleLogin = async (email, password) => {
    try {
      const newToken = await login(email, password);
      localStorage.setItem('auth_token', newToken);
      setToken(newToken);
      setIsAuthenticated(true);
      setError(null);
      // Load settings after login
      const data = await fetchSettings(newToken);
      setSettings({ ...defaultSettings, ...data });
      displayToast('Login successful!');
    } catch (err) {
      setError('Login failed');
      console.error(err);
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setIsAuthenticated(false);
    displayToast('Successfully logged out');
  };

  // Process form changes and automatically save to localStorage
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Common function to update local storage
    const updateLocalStorage = (newSettings) => {
      // Load existing settings and update
      const storedSettings = localStorage.getItem('banner_settings') || '{}';
      try {
        const parsedSettings = JSON.parse(storedSettings);
        localStorage.setItem('banner_settings', JSON.stringify({
          ...parsedSettings,
          [name]: newSettings[name]
        }));
        console.log('Local setting saved:', name, newSettings[name]);
      } catch (err) {
        console.error('Error saving local setting:', err);
        localStorage.setItem('banner_settings', JSON.stringify({
          [name]: newSettings[name]
        }));
      }
    };
    
    // Specifically for numeric values
    if (name === 'buttonBorderRadius' || name === 'consentLifetime') {
      setSettings(prev => {
        const numericValue = Number.parseInt(value, 10);
        const newSettings = { ...prev, [name]: numericValue };
        
        // Local storage
        updateLocalStorage(newSettings);
        
        // Immediate update of preview
        setTimeout(() => {
          const event = new CustomEvent('settingsUpdated', { 
            detail: { ...prev, [name]: numericValue } 
          });
          window.dispatchEvent(event);
        }, 0);
        
        return newSettings;
      });
    } else if (name === 'bannerAnimation') {
      // Special handling for animation
      setSettings(prev => {
        const newSettings = { ...prev, [name]: value };
        
        // Local storage
        updateLocalStorage(newSettings);
        
        // Immediate update of preview
        setTimeout(() => {
          const event = new CustomEvent('settingsUpdated', { 
            detail: { ...prev, [name]: value } 
          });
          window.dispatchEvent(event);
        }, 0);
        
        return newSettings;
      });
    } else {
      // All other values (including colors)
      setSettings(prev => {
        const newSettings = { ...prev, [name]: value };
        
        // Local storage
        updateLocalStorage(newSettings);
        
        // Immediate update of preview
        setTimeout(() => {
          const event = new CustomEvent('settingsUpdated', { 
            detail: { ...prev, [name]: value } 
          });
          window.dispatchEvent(event);
        }, 0);
        
        return newSettings;
      });
    }
  };

  // Save settings
  const handleSave = async () => {
    if (!token) {
      setError('Please log in to save settings');
      return;
    }
    
    try {
      setSaving(true);
      await saveSettings(settings, token);
      
      // Also update local settings when saving successfully
      // Save all important settings, not just animation
      localStorage.setItem('banner_settings', JSON.stringify({
        bannerAnimation: settings.bannerAnimation,
        bannerBgColor: settings.bannerBgColor,
        bannerTextColor: settings.bannerTextColor,
        buttonBgColor: settings.buttonBgColor,
        buttonTextColor: settings.buttonTextColor,
        buttonBorderRadius: settings.buttonBorderRadius,
        fontFamily: settings.fontFamily,
        linkColor: settings.linkColor,
        activeColor: settings.activeColor,
        // Save tab labels too
        settingsTabLabel: settings.settingsTabLabel,
        cookiesTabLabel: settings.cookiesTabLabel,
        policyTabLabel: settings.policyTabLabel,
        myDataTabLabel: settings.myDataTabLabel
      }));
      
      setSaving(false);
      displayToast('Settings saved successfully!');
    } catch (err) {
      setSaving(false);
      setError('Failed to save settings');
      displayToast('Error saving settings', 'error');
      console.error(err);
    }
  };

  // Process categories
  const handleCategoryChange = (category) => {
    setSettings(prev => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories };
    });
  };

  // Process translations
  const handleTranslationChange = (lang, field, value) => {
    setSettings(prev => {
      const updatedTranslations = { 
        ...prev.translations,
        [lang]: { 
          ...prev.translations[lang], 
          [field]: value 
        } 
      };
      return { ...prev, translations: updatedTranslations };
    });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50">
      <div className="text-center relative">
        <div className="spinner-3d-container floating">
          <div className="spinner-3d">
            <div className="spinner-3d-face">C</div>
            <div className="spinner-3d-face">S</div>
            <div className="spinner-3d-face"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" /><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" /></svg></div>
            <div className="spinner-3d-face"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg></div>
            <div className="spinner-3d-face">K</div>
            <div className="spinner-3d-face">E</div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="loading-text">Loading CookieShield Dashboard</h2>
          <p className="mt-3 text-gray-500 tracking-wide">Preparing your cookie management experience...</p>
        </div>
        
        {/* Shadow under the cube */}
        <div className="absolute w-16 h-2 bg-black/10 rounded-full blur-md -bottom-10 left-1/2 transform -translate-x-1/2" />
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} error={error} />;
  }

  return (
    <div className="min-h-screen py-8 relative overflow-hidden">
      {/* Toast-Benachrichtigung */}
      {showToast && (
        <div className={`toast ${toastType === 'success' ? 'toast-success' : 'toast-error'}`}>
          <div className="flex items-center">
            {toastType === 'success' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Two-column layout for settings and preview */}
      <div className="container">
        <div className="card mb-6 relative backdrop-blur-sm">
          <div className="card-header">
            <div className="flex items-center">
              <Image 
                src="/logo.svg" 
                alt="CookieShield Logo" 
                width={60}
                height={60}
                className="mr-3"
              />
              <h1 className="dashboard-title">Cookie Banner Dashboard</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="futuristic-button px-4 py-2 rounded-md text-white font-medium transition-all text-sm"
              >
                {saving ? (
                  <span className="flex items-center justify-center">
                    <span className="loader loader-small mr-2" />
                    Save Settings
                  </span>
                ) : (
                  'Save Settings'
                )}
              </button>
              <button 
                type="button"
                onClick={handleLogout} 
                className="logout-button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-4-4H3zm3 9h6m-6 3h6m4-3a1 1 0 010 2h-6m2-12v4h4M9 8h1" clipRule="evenodd" />
                </svg>
                Logout
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded">
              <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-labelledby="error-icon">
                  <title id="error-icon">Error</title>
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Two-column layout for settings and preview */}
          <div className="flex flex-col md:flex-row">
            {/* Left column: Settings */}
            <div className="w-full md:w-1/2 md:border-r border-gray-100 relative">
              <div className="bg-gradient-to-br from-purple-50/50 to-indigo-50/50 p-4 md:p-6 shadow-xl shadow-indigo-100/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br bg-indigo-50 from-indigo-100/20 to-purple-100/20 blur-3xl -translate-y-16 translate-x-16 rounded-full" />
                {/* Tabs Navigation */}
                <div className="flex flex-wrap gap-2 mb-6 mt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('text')}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${activeTab === 'text' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    Text Settings
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('language')}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${activeTab === 'language' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    Languages
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('cookie')}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${activeTab === 'cookie' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    Cookie Settings
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('design')}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${activeTab === 'design' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    Design
                  </button>
                </div>

                <div className="space-y-6 px-4 py-3">
                  {/* Text Settings */}
                  {activeTab === 'text' && (
                    <section className="form-section">
                      <h2 className="text-xl font-semibold mb-5 text-primary">Text Settings</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <label htmlFor="bannerMessage" className="block text-sm font-medium text-gray-700">Banner Message</label>
                            <textarea
                              id="bannerMessage"
                              name="bannerMessage"
                              value={settings.bannerMessage}
                              onChange={handleChange}
                              className="futuristic-input mt-1 block w-full"
                              rows="4"
                            />
                          </div>
                          <div className="space-y-3">
                            <label htmlFor="acceptAllLabel" className="block text-sm font-medium text-gray-700">Accept All Button</label>
                            <input
                              id="acceptAllLabel"
                              type="text"
                              name="acceptAllLabel"
                              value={settings.acceptAllLabel}
                              onChange={handleChange}
                              className="futuristic-input mt-1 block w-full"
                            />
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <label htmlFor="denyAllLabel" className="block text-sm font-medium text-gray-700">Deny All Button</label>
                            <input
                              id="denyAllLabel"
                              type="text"
                              name="denyAllLabel"
                              value={settings.denyAllLabel}
                              onChange={handleChange}
                              className="futuristic-input mt-1 block w-full"
                            />
                          </div>
                          <div className="space-y-3">
                            <label htmlFor="settingsLabel" className="block text-sm font-medium text-gray-700">Settings Button</label>
                            <input
                              id="settingsLabel"
                              type="text"
                              name="settingsLabel"
                              value={settings.settingsLabel}
                              onChange={handleChange}
                              className="futuristic-input mt-1 block w-full"
                            />
                          </div>
                          <div className="space-y-3">
                            <label htmlFor="saveLabel" className="block text-sm font-medium text-gray-700">Save Button</label>
                            <input
                              id="saveLabel"
                              type="text"
                              name="saveLabel"
                              value={settings.saveLabel}
                              onChange={handleChange}
                              className="futuristic-input mt-1 block w-full"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Tab Labels Section */}
                      <div className="mt-8">
                        <div className="flex items-center mb-5">
                          <div className="w-10 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600" />
                          <h3 className="mx-3 text-lg font-semibold text-primary">Tab Labels</h3>
                          <div className="flex-grow h-0.5 bg-gradient-to-r from-purple-600 to-transparent" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <label htmlFor="settingsTabLabel" className="block text-sm font-medium text-gray-700">Settings Tab</label>
                            <input
                              id="settingsTabLabel"
                              type="text"
                              name="settingsTabLabel"
                              value={settings.settingsTabLabel}
                              onChange={handleChange}
                              className="futuristic-input mt-1 block w-full"
                            />
                          </div>
                          <div className="space-y-3">
                            <label htmlFor="cookiesTabLabel" className="block text-sm font-medium text-gray-700">Cookies Tab</label>
                            <input
                              id="cookiesTabLabel"
                              type="text"
                              name="cookiesTabLabel"
                              value={settings.cookiesTabLabel}
                              onChange={handleChange}
                              className="futuristic-input mt-1 block w-full"
                            />
                          </div>
                          <div className="space-y-3">
                            <label htmlFor="policyTabLabel" className="block text-sm font-medium text-gray-700">Policy Tab</label>
                            <input
                              id="policyTabLabel"
                              type="text"
                              name="policyTabLabel"
                              value={settings.policyTabLabel}
                              onChange={handleChange}
                              className="futuristic-input mt-1 block w-full"
                            />
                          </div>
                          <div className="space-y-3">
                            <label htmlFor="myDataTabLabel" className="block text-sm font-medium text-gray-700">My Data Tab</label>
                            <input
                              id="myDataTabLabel"
                              type="text"
                              name="myDataTabLabel"
                              value={settings.myDataTabLabel}
                              onChange={handleChange}
                              className="futuristic-input mt-1 block w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Language Settings */}
                  {activeTab === 'language' && (
                    <section className="form-section">
                      <h2 className="text-xl font-semibold mb-5 text-primary">Language Settings</h2>
                      <div className="space-y-8">
                        <div className="space-y-3">
                          <label htmlFor="forcedLang" className="block text-sm font-medium text-gray-700">
                            Forced Language <span className="text-xs text-gray-500">(leave empty to auto-detect)</span>
                          </label>
                          <select
                            id="forcedLang"
                            name="forcedLang"
                            value={settings.forcedLang}
                            onChange={handleChange}
                            className="futuristic-input mt-1 block w-full"
                          >
                            <option value="">Auto-detect</option>
                            <option value="en">English</option>
                            <option value="de">Deutsch</option>
                            <option value="fr">Français</option>
                          </select>
                        </div>

                        <div className="mt-8">
                          <div className="flex items-center mb-5">
                            <div className="w-10 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600" />
                            <h3 className="mx-3 text-lg font-semibold text-primary">German Translations (DE)</h3>
                            <div className="flex-grow h-0.5 bg-gradient-to-r from-purple-600 to-transparent" />
                          </div>
                          
                          <div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-lg shadow-sm space-y-6">
                            <div className="space-y-3">
                              <label htmlFor="de-bannerMessage" className="block text-sm font-medium text-gray-700">Banner Message (DE)</label>
                              <textarea
                                id="de-bannerMessage"
                                value={settings.translations?.de?.bannerMessage || ''}
                                onChange={(e) => handleTranslationChange('de', 'bannerMessage', e.target.value)}
                                className="futuristic-input mt-1 block w-full"
                                rows="3"
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="space-y-3">
                                <label htmlFor="de-acceptAllLabel" className="block text-sm font-medium text-gray-700">Accept All (DE)</label>
                                <input
                                  id="de-acceptAllLabel"
                                  type="text"
                                  value={settings.translations?.de?.acceptAllLabel || ''}
                                  onChange={(e) => handleTranslationChange('de', 'acceptAllLabel', e.target.value)}
                                  className="futuristic-input mt-1 block w-full"
                                />
                              </div>
                              <div className="space-y-3">
                                <label htmlFor="de-denyAllLabel" className="block text-sm font-medium text-gray-700">Deny All (DE)</label>
                                <input
                                  id="de-denyAllLabel"
                                  type="text"
                                  value={settings.translations?.de?.denyAllLabel || ''}
                                  onChange={(e) => handleTranslationChange('de', 'denyAllLabel', e.target.value)}
                                  className="futuristic-input mt-1 block w-full"
                                />
                              </div>
                              <div className="space-y-3">
                                <label htmlFor="de-settingsLabel" className="block text-sm font-medium text-gray-700">Settings (DE)</label>
                                <input
                                  id="de-settingsLabel"
                                  type="text"
                                  value={settings.translations?.de?.settingsLabel || ''}
                                  onChange={(e) => handleTranslationChange('de', 'settingsLabel', e.target.value)}
                                  className="futuristic-input mt-1 block w-full"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Cookie Settings */}
                  {activeTab === 'cookie' && (
                    <section className="form-section">
                      <h2 className="text-xl font-semibold mb-5 text-primary">Cookie Settings</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <label htmlFor="consentLifetime" className="block text-sm font-medium text-gray-700">Consent Lifetime (seconds)</label>
                            <input
                              id="consentLifetime"
                              type="number"
                              name="consentLifetime"
                              value={settings.consentLifetime}
                              onChange={handleChange}
                              className="futuristic-input mt-1 block w-full"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              {Math.floor(settings.consentLifetime / 86400)} days, {Math.floor((settings.consentLifetime % 86400) / 3600)} hours
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <fieldset>
                            <legend className="block text-sm font-medium text-gray-700 mb-3">Categories</legend>
                            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-lg shadow-sm">
                              {['necessary', 'performance', 'functional', 'advertising'].map(category => (
                                <div key={category} className="flex items-center py-3 border-b border-gray-100 last:border-0">
                                  <input
                                    type="checkbox"
                                    id={category}
                                    checked={settings.categories.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                    className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary mr-3"
                                    disabled={category === 'necessary'}
                                  />
                                  <label htmlFor={category} className="text-sm text-gray-700 flex-grow">
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                  </label>
                                  {category === 'necessary' && (
                                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Required</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Design Settings */}
                  {activeTab === 'design' && (
                    <section className="form-section">
                      <h2 className="text-xl font-semibold mb-6 text-primary">Design Settings</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col">
                              <label htmlFor="bannerPosition" className="block text-sm font-medium text-gray-700 mb-3 h-6">Banner Position</label>
                              <select
                                id="bannerPosition"
                                name="bannerPosition"
                                value={settings.bannerPosition}
                                onChange={handleChange}
                                className="futuristic-input block w-full"
                              >
                                <option value="left">Left</option>
                                <option value="right">Right</option>
                              </select>
                            </div>
                            
                            <div className="flex flex-col">
                              <label htmlFor="bannerStyle" className="block text-sm font-medium text-gray-700 mb-3 h-6">Banner Style</label>
                              <select
                                id="bannerStyle"
                                name="bannerStyle"
                                value={settings.bannerStyle}
                                onChange={handleChange}
                                className="futuristic-input block w-full"
                              >
                                <option value="side">Side Panel</option>
                                <option value="full">Full Width</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col">
                              <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700 mb-3 h-6">Font Family</label>
                              <select
                                id="fontFamily"
                                name="fontFamily"
                                value={settings.fontFamily}
                                onChange={handleChange}
                                className="futuristic-input block w-full"
                                style={{ fontFamily: settings.fontFamily }}
                              >
                                <option value="Inter, sans-serif" style={{ fontFamily: 'Inter, sans-serif' }}>Inter</option>
                                <option value="Roboto, sans-serif" style={{ fontFamily: 'Roboto, sans-serif' }}>Roboto</option>
                                <option value="Open Sans, sans-serif" style={{ fontFamily: 'Open Sans, sans-serif' }}>Open Sans</option>
                                <option value="Arial, sans-serif" style={{ fontFamily: 'Arial, sans-serif' }}>Arial</option>
                                <option value="Georgia, serif" style={{ fontFamily: 'Georgia, serif' }}>Georgia</option>
                              </select>
                            </div>
                            
                            <div className="flex flex-col">
                              <label htmlFor="bannerAnimation" className="block text-sm font-medium text-gray-700 mb-3 h-6">Animation</label>
                              <select
                                id="bannerAnimation"
                                name="bannerAnimation"
                                value={settings.bannerAnimation}
                                onChange={handleChange}
                                className="futuristic-input block w-full"
                              >
                                <option value="none">None</option>
                                <option value="fade">Fade</option>
                                <option value="slide">Slide</option>
                                <option value="bounce">Bounce</option>
                              </select>
                            </div>
                          </div>
                          
                          {/* Border Radius with Preview */}
                          <div className="mt-4">
                            <label htmlFor="buttonBorderRadius" className="block text-sm font-medium text-gray-700 mb-3">
                              Button Border Radius
                            </label>
                            <div className="flex items-center gap-5">
                              <input
                                id="buttonBorderRadius"
                                type="range"
                                name="buttonBorderRadius"
                                min="0"
                                max="20"
                                value={settings.buttonBorderRadius}
                                onChange={handleChange}
                                className="flex-grow"
                              />
                              <div 
                                className="flex-shrink-0 w-16 h-16 flex items-center justify-center text-sm font-medium bg-gradient-to-br from-indigo-50 to-white shadow-sm border border-gray-100 transition-all"
                                style={{ 
                                  borderRadius: `${settings.buttonBorderRadius}px`,
                                  boxShadow: `0 0 0 1px rgba(${Number.parseInt(settings.buttonBgColor.slice(1, 3), 16)}, ${Number.parseInt(settings.buttonBgColor.slice(3, 5), 16)}, ${Number.parseInt(settings.buttonBgColor.slice(5, 7), 16)}, 0.1)`,
                                }}
                              >
                                {settings.buttonBorderRadius}px
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          {/* Banner Colors */}
                          <div className="mb-5">
                            <h3 className="text-base font-medium text-indigo-600 mb-4 inline-flex items-center">
                              <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2" />
                              Banner Colors
                            </h3>
                            <fieldset className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm">
                              <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                                <div className="flex flex-col items-center">
                                  <label htmlFor="bannerBgColor" className="block text-xs text-gray-600 mb-3 h-6">Background</label>
                                  <div className="color-preview-container relative">
                                    <label htmlFor="bannerBgColor" className="w-14 h-14 rounded-full shadow-sm mb-3 border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow block" 
                                      style={{backgroundColor: settings.bannerBgColor}}>
                                      <span className="sr-only">Choose color</span>
                                    </label>
                                    <input
                                      id="bannerBgColor"
                                      type="color"
                                      name="bannerBgColor"
                                      value={settings.bannerBgColor}
                                      onChange={handleChange}
                                      className="sr-only"
                                    />
                                    <input 
                                      type="text"
                                      value={settings.bannerBgColor}
                                      onChange={(e) => handleChange({target: {name: 'bannerBgColor', value: e.target.value}})}
                                      className="futuristic-input text-sm text-center w-24"
                                    />
                                  </div>
                                </div>
                                
                                <div className="flex flex-col items-center">
                                  <label htmlFor="bannerTextColor" className="block text-xs text-gray-600 mb-3 h-6">Text</label>
                                  <div className="color-preview-container relative">
                                    <label htmlFor="bannerTextColor" className="w-14 h-14 rounded-full shadow-sm mb-3 border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow block" 
                                      style={{backgroundColor: settings.bannerTextColor}}>
                                      <span className="sr-only">Choose color</span>
                                    </label>
                                    <input
                                      id="bannerTextColor"
                                      type="color"
                                      name="bannerTextColor"
                                      value={settings.bannerTextColor}
                                      onChange={handleChange}
                                      className="sr-only"
                                    />
                                    <input 
                                      type="text"
                                      value={settings.bannerTextColor}
                                      onChange={(e) => handleChange({target: {name: 'bannerTextColor', value: e.target.value}})}
                                      className="futuristic-input text-sm text-center w-24"
                                    />
                                  </div>
                                </div>
                                
                                <div className="flex flex-col items-center">
                                  <label htmlFor="linkColor" className="block text-xs text-gray-600 mb-3 h-6">Link Color</label>
                                  <div className="color-preview-container relative">
                                    <label htmlFor="linkColor" className="w-14 h-14 rounded-full shadow-sm mb-3 border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow block" 
                                      style={{backgroundColor: settings.linkColor}}>
                                      <span className="sr-only">Choose color</span>
                                    </label>
                                    <input
                                      id="linkColor"
                                      type="color"
                                      name="linkColor"
                                      value={settings.linkColor}
                                      onChange={handleChange}
                                      className="sr-only"
                                    />
                                    <input 
                                      type="text"
                                      value={settings.linkColor}
                                      onChange={(e) => handleChange({target: {name: 'linkColor', value: e.target.value}})}
                                      className="futuristic-input text-sm text-center w-24"
                                    />
                                  </div>
                                </div>
                                
                                <div className="flex flex-col items-center">
                                  <label htmlFor="activeColor" className="block text-xs text-gray-600 mb-3 h-6">Active Elements</label>
                                  <div className="color-preview-container relative">
                                    <label htmlFor="activeColor" className="w-14 h-14 rounded-full shadow-sm mb-3 border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow block" 
                                      style={{backgroundColor: settings.activeColor}}>
                                      <span className="sr-only">Choose color</span>
                                    </label>
                                    <input
                                      id="activeColor"
                                      type="color"
                                      name="activeColor"
                                      value={settings.activeColor}
                                      onChange={handleChange}
                                      className="sr-only"
                                    />
                                    <input 
                                      type="text"
                                      value={settings.activeColor}
                                      onChange={(e) => handleChange({target: {name: 'activeColor', value: e.target.value}})}
                                      className="futuristic-input text-sm text-center w-24"
                                    />
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                          
                          {/* Button Colors */}
                          <div className="mb-3">
                            <h3 className="text-base font-medium text-indigo-600 mb-4 inline-flex items-center">
                              <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2" />
                              Button Colors
                            </h3>
                            <fieldset className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm">
                              <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                                <div className="flex flex-col items-center">
                                  <label htmlFor="buttonBgColor" className="block text-xs text-gray-600 mb-3 h-6">Background</label>
                                  <div className="color-preview-container relative">
                                    <label htmlFor="buttonBgColor" className="w-14 h-14 rounded-full shadow-sm mb-3 border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow block" 
                                      style={{backgroundColor: settings.buttonBgColor}}>
                                      <span className="sr-only">Choose color</span>
                                    </label>
                                    <input
                                      id="buttonBgColor"
                                      type="color"
                                      name="buttonBgColor"
                                      value={settings.buttonBgColor}
                                      onChange={handleChange}
                                      className="sr-only"
                                    />
                                    <input 
                                      type="text"
                                      value={settings.buttonBgColor}
                                      onChange={(e) => handleChange({target: {name: 'buttonBgColor', value: e.target.value}})}
                                      className="futuristic-input text-sm text-center w-24"
                                    />
                                  </div>
                                </div>
                                
                                <div className="flex flex-col items-center">
                                  <label htmlFor="buttonTextColor" className="block text-xs text-gray-600 mb-3 h-6">Text</label>
                                  <div className="color-preview-container relative">
                                    <label htmlFor="buttonTextColor" className="w-14 h-14 rounded-full shadow-sm mb-3 border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow block" 
                                      style={{backgroundColor: settings.buttonTextColor}}>
                                      <span className="sr-only">Choose color</span>
                                    </label>
                                    <input
                                      id="buttonTextColor"
                                      type="color"
                                      name="buttonTextColor"
                                      value={settings.buttonTextColor}
                                      onChange={handleChange}
                                      className="sr-only"
                                    />
                                    <input 
                                      type="text"
                                      value={settings.buttonTextColor}
                                      onChange={(e) => handleChange({target: {name: 'buttonTextColor', value: e.target.value}})}
                                      className="futuristic-input text-sm text-center w-24"
                                    />
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Save Button */}
                  <div className="flex justify-end mt-5">
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
                      className="futuristic-button px-6 py-2 rounded-md text-white font-medium text-sm transition-all"
                    >
                      {saving ? (
                        <span className="flex items-center justify-center">
                          <span className="loader loader-small mr-2" />
                          Save
                        </span>
                      ) : (
                        'Save Settings'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: Preview */}
            <div className="w-full md:w-1/2 mt-8 md:mt-0 relative">
              <div className="banner-preview-container transition-all duration-500 will-change-transform" 
                     style={{ zIndex: 10 }}>
                <div className="relative bg-gradient-to-br from-white/80 to-indigo-50/50 p-6 shadow-blue-100/40">
                  <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-indigo-200/20 to-purple-300/20 blur-3xl rounded-full pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-gradient-to-tr from-blue-200/20 to-indigo-200/20 blur-3xl rounded-full pointer-events-none" />
                  
                  {/* View mode toggles - centered */}
                  <div className="mb-6 flex justify-center gap-4 relative z-10">
                    <button 
                      type="button"
                      className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                      onClick={() => {
                        // Set showDetailedView status in BannerPreview to false
                        const event = new CustomEvent('toggleBannerView', { 
                          detail: { showDetailedView: false }
                        });
                        window.dispatchEvent(event);
                      }}
                    >
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Compact View
                      </span>
                    </button>
                    <button 
                      type="button"
                      className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                      onClick={() => {
                        // Set showDetailedView status in BannerPreview to true
                        const event = new CustomEvent('toggleBannerView', { 
                          detail: { showDetailedView: true }
                        });
                        window.dispatchEvent(event);
                      }}
                    >
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Detailed View
                      </span>
                    </button>
                  </div>
                  
                  <div className="relative w-full top-2.5">
                    <div className="relative w-full min-h-[600px] flex items-center justify-center">
                      {/* Cookie-Banner Component */}
                      <BannerPreview settings={settings} />
                    </div>
                  </div>
                  
                  {/* Info box below preview */}
                  <div className="mt-6 mb-4 bg-white p-4 rounded-lg border border-gray-100 text-xs text-gray-500 shadow-sm">
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>The preview shows how the cookie banner will appear on the website. Adjustments are displayed in real-time.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer with additional scroll space */}
      <div className="container mt-24 pb-40">
        <div className="card">
          <div className="card-body">
            <h2 className="text-xl font-semibold mb-4 text-primary">CookieShield Documentation</h2>
            <div className="space-y-6">
              <div className="form-section">
                <h3 className="text-lg font-semibold mb-3 text-primary">Introduction</h3>
                <p className="text-gray-700 leading-relaxed">
                  CookieShield is a comprehensive solution for GDPR-compliant cookie banners on your website.
                  Our system allows you to customize your cookie settings and provide transparent information
                  about cookie usage to your visitors.
                </p>
              </div>
              
              <div className="form-section">
                <h3 className="text-lg font-semibold mb-3 text-primary">Technical Overview</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  CookieShield is based on a modern architecture with a React component for the frontend
                  and a Laravel backend for managing settings and user authentication.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-primary mb-2">Frontend</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• React.js for UI components</li>
                      <li>• Tailwind CSS for styling</li>
                      <li>• Local settings in the browser</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-primary mb-2">Backend</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Laravel framework</li>
                      <li>• RESTful API endpoints</li>
                      <li>• JSON Web Token (JWT) Auth</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-primary mb-2">Storage</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Local browser storage</li>
                      <li>• API synchronization</li>
                      <li>• Encrypted transmission</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h3 className="text-lg font-semibold mb-3 text-primary">Data Privacy Compliance</h3>
                <p className="text-gray-700 leading-relaxed">
                  CookieShield was developed to meet the requirements of GDPR and similar data privacy laws.
                  Our banner offers a clear categorization of cookies and allows users to give or deny consent.
                  All consents are securely stored and can be proven at any time.
                </p>
              </div>
              
              <div className="form-section">
                <h3 className="text-lg font-semibold mb-3 text-primary">Support</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions or problems, we are happy to help. Our support team is available
                  from Monday to Friday from 9:00 to 17:00.
                </p>
                <button 
                  type="button"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:-translate-y-1"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} CookieShield. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-3">
            <a href="/impressum" className="text-sm text-gray-500 hover:text-primary">Legal Notice</a>
            <a href="/datenschutz" className="text-sm text-gray-500 hover:text-primary">Data Privacy</a>
            <a href="/agb" className="text-sm text-gray-500 hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  );
}