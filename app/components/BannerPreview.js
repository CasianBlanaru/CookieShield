'use client';

import { useRef, useEffect, useCallback, useState } from 'react';

export default function BannerPreview({ settings }) {
  // Banner reference
  const bannerRef = useRef(null);
  const containerRef = useRef(null);
  const hasAnimationApplied = useRef(false);
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [activeTab, setActiveTab] = useState('settings');
  const [cookieCategories, setCookieCategories] = useState({
    necessary: true,
    performance: false,
    functional: false,
    advertising: false
  });
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('de'); // Default to German
  const languageDropdownRef = useRef(null);

  // Available languages with labels - defined as a constant, not a state variable
  const availableLanguages = {
    en: 'English',
    de: 'Deutsch',
    fr: 'Français'
  };

  // Country flags for each language
  const languageFlags = {
    en: '🇬🇧',
    de: '🇩🇪',
    fr: '🇫🇷'
  };

  // Function to get the translated text based on current language
  const getTranslatedText = (key, defaultText) => {
    if (currentLanguage === 'en') {
      return settings[key] || defaultText;
    }
    
    if (settings.translations?.[currentLanguage]?.[key]) {
      return settings.translations[currentLanguage][key];
    }
    
    return defaultText;
  };

  // Function to handle language change
  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    setShowLanguageDropdown(false);
  };

  // Effect to close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Effect to update the language based on the forced language setting
  useEffect(() => {
    // Check if forcedLang is set and is a valid language code
    if (settings.forcedLang && availableLanguages[settings.forcedLang]) {
      setCurrentLanguage(settings.forcedLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.forcedLang]);

  // Function to apply selected animation to the banner
  const applyAnimation = useCallback((animationType) => {
    const bannerElement = bannerRef.current?.querySelector('.w-\\[450px\\]');
    if (!bannerElement) return;
    
    // First remove all animation classes
    bannerElement.classList.remove('animate-fade', 'animate-slide', 'animate-bounce');
    
    // Add appropriate animation class
    switch (animationType) {
      case 'fade':
        bannerElement.classList.add('animate-fade');
        console.log('Applied fade animation');
        break;
      case 'slide':
        bannerElement.classList.add('animate-slide');
        console.log('Applied slide animation');
        break;
      case 'bounce':
        bannerElement.classList.add('animate-bounce');
        console.log('Applied bounce animation');
        break;
      case 'none':
        console.log('No animation applied');
        break;
      default:
        // No animation or invalid type
        console.log('Invalid animation type or no animation:', animationType);
        break;
    }
    
    // Mark that animation has been applied
    hasAnimationApplied.current = true;
  }, []);

  // Initial on mounting
  useEffect(() => {
    console.log('BannerPreview is initializing');
    // Timeout to ensure DOM is fully loaded
    const timer = setTimeout(() => {
      if (bannerRef.current && settings.bannerAnimation) {
        console.log('Applying initial animation:', settings.bannerAnimation);
        applyAnimation(settings.bannerAnimation);
      } else {
        console.log('Initial animation not possible:', { 
          ref: !!bannerRef.current, 
          animation: settings.bannerAnimation 
        });
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [settings.bannerAnimation, applyAnimation]);

  // When settings change
  useEffect(() => {
    console.log('Settings updated:', settings);
    
    // Apply animation when settings change
    if (bannerRef.current && settings.bannerAnimation) {
      console.log('Applying animation from settings:', settings.bannerAnimation);
      applyAnimation(settings.bannerAnimation);
    }
  }, [settings, applyAnimation]);

  // Event listener for global settings updates
  useEffect(() => {
    console.log('Setting up event listener for settingsUpdated');
    
    const handleSettingsUpdated = (event) => {
      console.log('Global settingsUpdated event received', event.detail);
      // If event.detail exists, manually update styles
      if (event.detail && bannerRef.current) {
        const updatedSettings = event.detail;
        
        // Find the main banner element
        const mainContainer = bannerRef.current.querySelector('.w-\\[450px\\]');
        if (mainContainer) {
          // Update background color
          if (updatedSettings.bannerBgColor) {
            mainContainer.style.backgroundColor = updatedSettings.bannerBgColor;
            console.log('Setting banner background color:', updatedSettings.bannerBgColor);
          }
          
          // Update text color and font
          if (updatedSettings.bannerTextColor || updatedSettings.fontFamily) {
            if (updatedSettings.bannerTextColor) {
              mainContainer.style.color = updatedSettings.bannerTextColor;
              console.log('Setting banner text color:', updatedSettings.bannerTextColor);
              
              // Also update text color for the Save button
              const saveButton = mainContainer.querySelector('button:nth-of-type(2)');
              if (saveButton) {
                saveButton.style.color = updatedSettings.bannerTextColor;
              }
            }
            
            if (updatedSettings.fontFamily) {
              mainContainer.style.fontFamily = updatedSettings.fontFamily;
              console.log('Setting banner font family:', updatedSettings.fontFamily);
            }
          }
          
          // Update link color
          if (updatedSettings.linkColor) {
            const linksElement = mainContainer.querySelector('.text-\\[\\#e97040\\]');
            if (linksElement) {
              linksElement.style.color = updatedSettings.linkColor;
              console.log('Setting link color:', updatedSettings.linkColor);
            }
            
            // Update all SVG icons that should have the link color
            const linkColorSvgs = mainContainer.querySelectorAll('svg[style]');
            for (const svg of linkColorSvgs) {
              svg.style.color = updatedSettings.linkColor;
            }
          }
          
          // Update active elements color
          if (updatedSettings.activeColor) {
            // Apply to all tabs
            const allTabs = mainContainer.querySelectorAll('.flex.border-b.border-gray-200 button');
            if (allTabs.length > 0) {
              for (const tab of allTabs) {
                // Only apply to the active tab (the one with border-b-2 class)
                if (tab.classList.contains('border-b-2')) {
                  tab.style.borderColor = updatedSettings.activeColor;
                  tab.style.color = updatedSettings.activeColor;
                }
              }
              console.log('Setting active tab colors:', updatedSettings.activeColor);
            }

            // Also update the "Anpassen" button border in the compact view
            const customizeButton = mainContainer.querySelector('button[style*="borderColor"]');
            if (customizeButton) {
              customizeButton.style.borderColor = updatedSettings.activeColor;
              customizeButton.style.color = updatedSettings.activeColor;
            }
          }
          
          // Update button styles
          const acceptButton = mainContainer.querySelector('button:first-of-type');
          const saveButton = mainContainer.querySelector('button:nth-of-type(2)');
          
          if (acceptButton && updatedSettings.buttonBgColor) {
            acceptButton.style.backgroundColor = updatedSettings.buttonBgColor;
            console.log('Setting button background color:', updatedSettings.buttonBgColor);
          }
          
          if (acceptButton && updatedSettings.buttonTextColor) {
            acceptButton.style.color = updatedSettings.buttonTextColor;
            console.log('Setting button text color:', updatedSettings.buttonTextColor);
          }
          
          // Border radius for both buttons
          if (updatedSettings.buttonBorderRadius !== undefined) {
            const borderRadius = `${updatedSettings.buttonBorderRadius}px`;
            
            if (acceptButton) {
              acceptButton.style.borderRadius = borderRadius;
              console.log('Setting button border radius:', borderRadius);
            }
            
            if (saveButton) {
              saveButton.style.borderRadius = borderRadius;
            }
          }
          
          // Update animation if provided
          if (updatedSettings.bannerAnimation !== undefined) {
            console.log('Setting banner animation from event:', updatedSettings.bannerAnimation);
            applyAnimation(updatedSettings.bannerAnimation);
          }

          // Update tab labels if they've changed
          if (updatedSettings.settingsTabLabel || updatedSettings.cookiesTabLabel || 
              updatedSettings.policyTabLabel || updatedSettings.myDataTabLabel) {
            
            // Find the tab buttons
            const tabButtons = mainContainer.querySelectorAll('.flex.border-b.border-gray-200 button');
            
            if (tabButtons.length >= 4) {
              // Update tab labels with new text if provided
              if (updatedSettings.settingsTabLabel) {
                tabButtons[0].textContent = updatedSettings.settingsTabLabel;
              }
              if (updatedSettings.cookiesTabLabel) {
                tabButtons[1].textContent = updatedSettings.cookiesTabLabel;
              }
              if (updatedSettings.policyTabLabel) {
                tabButtons[2].textContent = updatedSettings.policyTabLabel;
              }
              if (updatedSettings.myDataTabLabel) {
                tabButtons[3].textContent = updatedSettings.myDataTabLabel;
              }
              
              console.log('Updated tab labels');
            }
          }
        }
      }
    };

    window.addEventListener('settingsUpdated', handleSettingsUpdated);
    return () => {
      window.removeEventListener('settingsUpdated', handleSettingsUpdated);
    };
  }, [applyAnimation]);

  // One more attempt to apply animation after complete render
  useEffect(() => {
    // If after 500ms we still haven't applied animation and banner exists
    const timer = setTimeout(() => {
      if (bannerRef.current && settings.bannerAnimation && !hasAnimationApplied.current) {
        console.log('Last chance to apply animation:', settings.bannerAnimation);
        applyAnimation(settings.bannerAnimation);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [settings.bannerAnimation, applyAnimation]);

  // Update cookie categories from settings
  useEffect(() => {
    if (settings.categories) {
      setCookieCategories({
        necessary: true,
        performance: settings.categories.includes('performance'),
        functional: settings.categories.includes('functional'),
        advertising: settings.categories.includes('advertising')
      });
    }
  }, [settings.categories]);

  // Banner style based on settings
  const bannerStyle = {
    fontFamily: settings.fontFamily || 'Inter, sans-serif',
    backgroundColor: settings.bannerBgColor || 'white',
    color: settings.bannerTextColor || '#333333'
  };

  // Link style based on settings
  const linkStyle = {
    color: settings.linkColor || '#e97040'
  };

  // Active element style based on settings
  const activeStyle = {
    color: settings.activeColor || '#e97040',
    borderColor: settings.activeColor || '#e97040'
  };

  // Toggle function for detailed settings view
  const toggleDetailedView = () => {
    setShowDetailedView(!showDetailedView);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Toggle cookie category
  const toggleCookieCategory = (category) => {
    if (category === 'necessary') return;
    
    setCookieCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // This animation class is applied directly to the container
  const animationClass = settings.bannerAnimation ? `animate-${settings.bannerAnimation}` : '';

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      {/* Screen frame - adjusted for column view */}
      <div 
        className="relative w-full h-full"
        style={{
          boxShadow: '0 25px 50px -12px rgba(83, 100, 252, 0.25)'
        }}
      >
        {/* Screen interior with pseudo-website - taller for column view */}
        <div className="rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-100 h-full flex flex-col">
          {/* Website header */}
          <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="mx-auto bg-white rounded-full h-6 w-2/3 flex items-center justify-center text-xs text-gray-500">example-website.com</div>
          </div>
          
          {/* Website content - flexible for column view */}
          <div className="flex-grow bg-gradient-to-br from-gray-50 to-white p-6 flex flex-col">
            <div className="h-6 w-2/3 bg-gray-200 rounded mb-4" />
            <div className="h-4 w-1/2 bg-gray-100 rounded mb-3" />
            <div className="h-4 w-5/6 bg-gray-100 rounded mb-3" />
            <div className="h-4 w-4/6 bg-gray-100 rounded mb-3" />
            <div className="h-4 w-3/4 bg-gray-100 rounded mb-3" />
            <div className="h-4 w-5/6 bg-gray-100 rounded mb-3" />
            <div className="h-4 w-1/2 bg-gray-100 rounded mb-3" />
            <div className="h-4 w-2/3 bg-gray-100 rounded mb-3" />
            <div className="flex gap-3 mt-auto">
              <div className="h-8 w-20 bg-blue-100 rounded" />
              <div className="h-8 w-20 bg-blue-100 rounded" />
            </div>
          </div>
          
          {/* Cookie banner - fixed centered instead of draggable */}
          <div 
            ref={bannerRef}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              zIndex: 50
            }}
          >
            {!showDetailedView ? (
              /* Compact Banner View */
              <div
                className={`w-[450px] p-4 rounded-lg shadow-lg border border-gray-100 ${animationClass}`}
                style={{
                  ...bannerStyle,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02)'
                }}
              >
                {/* Header with language and privacy links */}
                <div className="flex justify-between mb-4">
                  <div className="flex items-center relative" ref={languageDropdownRef}>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="flex items-center focus:outline-none"
                        onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                        aria-haspopup="true"
                        aria-expanded={showLanguageDropdown}
                      >
                        <span className="text-[#e97040] mr-1 text-sm" style={linkStyle}>
                          <span className="mr-1">{languageFlags[currentLanguage]}</span>
                          {availableLanguages[currentLanguage]}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" style={linkStyle} aria-hidden="true">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Language Dropdown */}
                    {showLanguageDropdown && (
                      <div className="absolute top-6 left-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-50 py-1">
                        {Object.entries(availableLanguages).map(([code, name]) => (
                          <button
                            key={code}
                            type="button"
                            className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 ${currentLanguage === code ? 'font-medium text-[#e97040]' : 'text-gray-700'}`}
                            onClick={() => handleLanguageChange(code)}
                          >
                            <span className="mr-2">{languageFlags[code]}</span>
                            {name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs mr-2" style={linkStyle}>{getTranslatedText('privacyTerms', 'Datenschutzbestimmungen | Impressum')}</span>
                    <button type="button" className="text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Main content */}
                <div className="mb-4">
                  <h2 className="text-lg font-bold mb-2" style={{ color: settings.bannerTextColor || '#333333' }}>
                    {getTranslatedText('weUseCookies', 'Wir verwenden Cookies')}
                  </h2>
                  <p className="mb-3 text-sm leading-relaxed" style={{ color: settings.bannerTextColor || '#333333' }}>
                    {getTranslatedText('wePlaceCookies', 'Wir können diese zur Analyse unserer Besucherdaten platzieren, um unsere Website zu verbessern, personalisierte Inhalte anzuzeigen und Ihnen ein großartiges Website-Erlebnis zu bieten. Für weitere Informationen zu den von uns verwendeten Cookies öffnen Sie die Einstellungen.')}
                  </p>
                  <p className="mb-3 text-sm leading-relaxed" style={{ color: settings.bannerTextColor || '#333333' }}>
                    {getTranslatedText('dataCollected', 'Die Daten werden zum Zweck der Personalisierung von Werbung und zur Messung der Wirksamkeit von Werbekampagnen erhoben. Die Daten können mit Google LLC geteilt werden, weitere Informationen finden Sie')}
                    <span style={linkStyle}>{getTranslatedText('here', 'hier')}</span>.
                  </p>
                  <p className="mb-4 text-sm leading-relaxed" style={{ color: settings.bannerTextColor || '#333333' }}>
                    {getTranslatedText('consent', 'Ihre Einwilligung und die Cookie Richtlinie gelten für alle Websites von &bdquo;CookieShield&ldquo;, einschließlich: CookieShield Live, app.cookieshield.com/.')}
                  </p>
                </div>
                
                {/* Cookie type toggles */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {/* Necessary - always on */}
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-6 relative rounded-full p-1 flex items-center bg-gray-100">
                      <span 
                        className="absolute w-4 h-4 rounded-full shadow-sm transition-all duration-300 bg-indigo-400"
                        style={{ left: 'calc(100% - 20px)' }}
                      />
                    </div>
                    <span className="font-medium text-sm" style={{ color: settings.bannerTextColor || '#333333' }}>{getTranslatedText('necessary', 'Notwendig')}</span>
                  </div>
                  
                  {/* Performance */}
                  <div className="flex items-center space-x-2">
                    <button 
                      type="button"
                      className="w-12 h-6 relative rounded-full p-1 flex items-center transition-colors duration-300 ease-in-out"
                      style={{ 
                        backgroundColor: cookieCategories.performance ? 'rgba(243, 244, 246, 0.8)' : 'rgba(229, 231, 235, 0.5)',
                        boxShadow: cookieCategories.performance ? '0 0 1px rgba(79, 70, 229, 0.3)' : 'none'
                      }}
                      onClick={() => toggleCookieCategory('performance')}
                      aria-pressed={cookieCategories.performance}
                      aria-label={getTranslatedText('activatePerformanceCookies', 'Performance-Cookies aktivieren oder deaktivieren')}
                    >
                      <div 
                        className="w-4 h-4 rounded-full shadow-md transition-all duration-300 ease-in-out"
                        style={{
                          backgroundColor: cookieCategories.performance ? 'rgba(79, 70, 229, 0.9)' : 'rgba(156, 163, 175, 0.9)',
                          marginLeft: cookieCategories.performance ? 'auto' : '0',
                          transform: cookieCategories.performance ? 'scale(1.05)' : 'scale(1)'
                        }}
                      />
                    </button>
                    <span className="font-medium text-sm" style={{ color: settings.bannerTextColor || '#333333' }}>{getTranslatedText('performance', 'Performance')}</span>
                  </div>
                  
                  {/* Functional */}
                  <div className="flex items-center space-x-2">
                    <button 
                      type="button"
                      className="w-12 h-6 relative rounded-full p-1 flex items-center transition-colors duration-300 ease-in-out"
                      style={{ 
                        backgroundColor: cookieCategories.functional ? 'rgba(243, 244, 246, 0.8)' : 'rgba(229, 231, 235, 0.5)',
                        boxShadow: cookieCategories.functional ? '0 0 1px rgba(79, 70, 229, 0.3)' : 'none'
                      }}
                      onClick={() => toggleCookieCategory('functional')}
                      aria-pressed={cookieCategories.functional}
                      aria-label={getTranslatedText('activateFunctionalCookies', 'Funktionale Cookies aktivieren oder deaktivieren')}
                    >
                      <div 
                        className="w-4 h-4 rounded-full shadow-md transition-all duration-300 ease-in-out"
                        style={{
                          backgroundColor: cookieCategories.functional ? 'rgba(79, 70, 229, 0.9)' : 'rgba(156, 163, 175, 0.9)',
                          marginLeft: cookieCategories.functional ? 'auto' : '0',
                          transform: cookieCategories.functional ? 'scale(1.05)' : 'scale(1)'
                        }}
                      />
                    </button>
                    <span className="font-medium text-sm" style={{ color: settings.bannerTextColor || '#333333' }}>{getTranslatedText('functional', 'Funktional')}</span>
                  </div>
                  
                  {/* Advertising */}
                  <div className="flex items-center space-x-2">
                    <button 
                      type="button"
                      className="w-12 h-6 relative rounded-full p-1 flex items-center transition-colors duration-300 ease-in-out"
                      style={{ 
                        backgroundColor: cookieCategories.advertising ? 'rgba(243, 244, 246, 0.8)' : 'rgba(229, 231, 235, 0.5)',
                        boxShadow: cookieCategories.advertising ? '0 0 1px rgba(79, 70, 229, 0.3)' : 'none'
                      }}
                      onClick={() => toggleCookieCategory('advertising')}
                      aria-pressed={cookieCategories.advertising}
                      aria-label={getTranslatedText('activateAdvertisingCookies', 'Werbe-Cookies aktivieren oder deaktivieren')}
                    >
                      <div 
                        className="w-4 h-4 rounded-full shadow-md transition-all duration-300 ease-in-out"
                        style={{
                          backgroundColor: cookieCategories.advertising ? 'rgba(79, 70, 229, 0.9)' : 'rgba(156, 163, 175, 0.9)',
                          marginLeft: cookieCategories.advertising ? 'auto' : '0',
                          transform: cookieCategories.advertising ? 'scale(1.05)' : 'scale(1)'
                        }}
                      />
                    </button>
                    <span className="font-medium text-sm" style={{ color: settings.bannerTextColor || '#333333' }}>{getTranslatedText('advertising', 'Werbung')}</span>
                  </div>
                </div>
                
                {/* Footer with buttons */}
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-12 mb-2">
                    <button 
                      type="button" 
                      className="w-full py-2 font-medium text-center rounded-md border-2 text-sm"
                      style={{
                        borderColor: settings.activeColor || '#e97040',
                        color: settings.activeColor || '#e97040',
                        backgroundColor: 'transparent',
                        borderRadius: `${settings.buttonBorderRadius || 4}px`
                      }}
                      onClick={toggleDetailedView}
                    >
                      {getTranslatedText('customize', 'Anpassen')}
                    </button>
                  </div>
                  <div className="col-span-6">
                    <button 
                      type="button" 
                      className="w-full py-2 font-medium text-center rounded-md bg-gray-900 text-sm"
                      style={{
                        color: 'white',
                        borderRadius: `${settings.buttonBorderRadius || 4}px`
                      }}
                    >
                      {getTranslatedText('reject', 'Ablehnen')}
                    </button>
                  </div>
                  <div className="col-span-6">
                    <button 
                      type="button" 
                      className="w-full py-2 font-medium text-center rounded-md text-sm"
                      style={{
                        backgroundColor: settings.buttonBgColor || '#4F46E5',
                        color: settings.buttonTextColor || 'white',
                        borderRadius: `${settings.buttonBorderRadius || 4}px`
                      }}
                    >
                      {getTranslatedText('acceptAll', 'Alle akzeptieren')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Detailed Settings View */
              <div
                className={`w-[450px] p-4 rounded-lg shadow-lg border border-gray-100 ${animationClass}`}
                style={{
                  ...bannerStyle,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02)'
                }}
              >
                {/* Header with language and close button */}
                <div className="flex justify-between mb-3">
                  <div className="flex items-center relative" ref={languageDropdownRef}>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="flex items-center focus:outline-none"
                        onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                        aria-haspopup="true"
                        aria-expanded={showLanguageDropdown}
                      >
                        <span className="text-[#e97040] mr-1 text-sm" style={linkStyle}>
                          <span className="mr-1">{languageFlags[currentLanguage]}</span>
                          {availableLanguages[currentLanguage]}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" style={linkStyle} aria-hidden="true">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Language Dropdown */}
                    {showLanguageDropdown && (
                      <div className="absolute top-6 left-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-50 py-1">
                        {Object.entries(availableLanguages).map(([code, name]) => (
                          <button
                            key={code}
                            type="button"
                            className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 ${currentLanguage === code ? 'font-medium text-[#e97040]' : 'text-gray-700'}`}
                            onClick={() => handleLanguageChange(code)}
                          >
                            <span className="mr-2">{languageFlags[code]}</span>
                            {name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs mr-2" style={linkStyle}>{getTranslatedText('privacyTerms', 'Datenschutzbestimmungen | Impressum')}</span>
                    <button type="button" className="text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Tabs Navigation */}
                <div className="flex border-b border-gray-200 mb-4">
                  <button 
                    type="button" 
                    className={`px-3 py-1.5 text-sm font-medium ${activeTab === 'settings' ? 'border-b-2' : ''}`} 
                    style={activeTab === 'settings' ? activeStyle : {}}
                    onClick={() => handleTabChange('settings')}
                  >
                    {getTranslatedText('settings', 'Einstellungen')}
                  </button>
                  <button 
                    type="button" 
                    className={`px-3 py-1.5 text-sm font-medium ${activeTab === 'cookies' ? 'border-b-2' : 'text-gray-500'}`}
                    style={activeTab === 'cookies' ? activeStyle : {}}
                    onClick={() => handleTabChange('cookies')}
                  >
                    {getTranslatedText('cookies', 'Cookies')}
                  </button>
                  <button 
                    type="button" 
                    className={`px-3 py-1.5 text-sm font-medium ${activeTab === 'policy' ? 'border-b-2' : 'text-gray-500'}`}
                    style={activeTab === 'policy' ? activeStyle : {}}
                    onClick={() => handleTabChange('policy')}
                  >
                    {getTranslatedText('cookiePolicy', 'Cookie-Richtlinie')}
                  </button>
                  <button 
                    type="button" 
                    className={`px-3 py-1.5 text-sm font-medium ${activeTab === 'mydata' ? 'border-b-2' : 'text-gray-500'}`}
                    style={activeTab === 'mydata' ? activeStyle : {}}
                    onClick={() => handleTabChange('mydata')}
                  >
                    {getTranslatedText('myData', 'Meine Daten')}
                  </button>
                </div>
                
                {/* Content area */}
                <div className="mb-4 overflow-y-auto max-h-[175px] pr-2 text-sm">
                  {activeTab === 'settings' && (
                    <>
                      <p className="mb-4" style={{ color: settings.bannerTextColor || '#333333' }}>
                        {getTranslatedText('weUseData', 'Wir würden Ihre Daten gerne zu folgenden Zwecken verwenden:')}
                      </p>
                      
                      {/* Necessary */}
                      <div className="border border-gray-200 rounded-md mb-2 overflow-hidden">
                        <div className="flex justify-between items-center p-3">
                          <div>
                            <h3 className="font-semibold text-sm" style={{ color: settings.bannerTextColor || '#333333' }}>{getTranslatedText('necessary', 'Notwendig')}</h3>
                            <p className="text-xs mt-1" style={{ color: settings.bannerTextColor ? `${settings.bannerTextColor}99` : '#6b7280' }}>
                              {getTranslatedText('necessaryDescription', 'Diese Cookies sind für eine gute Funktionalität unserer Webseite erforderlich und können in unserem System nicht ausgeschaltet werden.')}
                            </p>
                          </div>
                          <div className="w-12 h-6 bg-gray-100 rounded-full p-1 flex items-center">
                            <div className="w-4 h-4 bg-indigo-400 rounded-full ml-auto shadow-sm" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Performance */}
                      <div className="border border-gray-200 rounded-md mb-2 overflow-hidden">
                        <button 
                          className="flex justify-between items-center p-3 cursor-pointer w-full text-left"
                          onClick={() => toggleCookieCategory('performance')}
                          type="button"
                        >
                          <div>
                            <h3 className="font-semibold text-sm" style={{ color: settings.bannerTextColor || '#333333' }}>{getTranslatedText('performance', 'Performance')}</h3>
                            <p className="text-xs mt-1" style={{ color: settings.bannerTextColor ? `${settings.bannerTextColor}99` : '#6b7280' }}>
                              {getTranslatedText('performanceDescription', 'Wir verwenden diese Cookies, um statistische Informationen über unsere Webseite bereitzustellen.')}
                            </p>
                          </div>
                          <div className="w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ease-in-out" 
                               style={{ 
                                 backgroundColor: cookieCategories.performance ? 'rgba(243, 244, 246, 0.8)' : 'rgba(229, 231, 235, 0.5)',
                                 boxShadow: cookieCategories.performance ? '0 0 1px rgba(79, 70, 229, 0.3)' : 'none'
                               }}>
                            <div 
                              className="w-4 h-4 rounded-full shadow-md transition-all duration-300 ease-in-out"
                              style={{
                                backgroundColor: cookieCategories.performance ? 'rgba(79, 70, 229, 0.9)' : 'rgba(156, 163, 175, 0.9)',
                                marginLeft: cookieCategories.performance ? 'auto' : '0',
                                transform: cookieCategories.performance ? 'scale(1.05)' : 'scale(1)'
                              }}
                            />
                          </div>
                        </button>
                      </div>

                      {/* Functional */}
                      <div className="border border-gray-200 rounded-md mb-2 overflow-hidden">
                        <button 
                          className="flex justify-between items-center p-3 cursor-pointer w-full text-left"
                          onClick={() => toggleCookieCategory('functional')}
                          type="button"
                        >
                          <div>
                            <h3 className="font-semibold text-sm" style={{ color: settings.bannerTextColor || '#333333' }}>{getTranslatedText('functional', 'Funktional')}</h3>
                            <p className="text-xs mt-1" style={{ color: settings.bannerTextColor ? `${settings.bannerTextColor}99` : '#6b7280' }}>
                              {getTranslatedText('functionalDescription', 'Wir verwenden diese Cookies, um die Funktionalität zu verbessern und die Personalisierung zu ermöglichen.')}
                            </p>
                          </div>
                          <div className="w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ease-in-out"
                               style={{ 
                                 backgroundColor: cookieCategories.functional ? 'rgba(243, 244, 246, 0.8)' : 'rgba(229, 231, 235, 0.5)',
                                 boxShadow: cookieCategories.functional ? '0 0 1px rgba(79, 70, 229, 0.3)' : 'none'
                               }}>
                            <div 
                              className="w-4 h-4 rounded-full shadow-md transition-all duration-300 ease-in-out"
                              style={{
                                backgroundColor: cookieCategories.functional ? 'rgba(79, 70, 229, 0.9)' : 'rgba(156, 163, 175, 0.9)',
                                marginLeft: cookieCategories.functional ? 'auto' : '0',
                                transform: cookieCategories.functional ? 'scale(1.05)' : 'scale(1)'
                              }}
                            />
                          </div>
                        </button>
                      </div>

                      {/* Werbung */}
                      <div className="border border-gray-200 rounded-md mb-2 overflow-hidden">
                        <button 
                          className="flex justify-between items-center p-3 cursor-pointer w-full text-left"
                          onClick={() => toggleCookieCategory('advertising')}
                          type="button"
                        >
                          <div>
                            <h3 className="font-semibold text-sm" style={{ color: settings.bannerTextColor || '#333333' }}>{getTranslatedText('advertising', 'Werbung')}</h3>
                            <p className="text-xs mt-1" style={{ color: settings.bannerTextColor ? `${settings.bannerTextColor}99` : '#6b7280' }}>
                              {getTranslatedText('advertisingDescription', 'Diese Cookies werden von unseren Werbepartnern auf unserer Website gesetzt.')}
                            </p>
                          </div>
                          <div className="w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ease-in-out"
                               style={{ 
                                 backgroundColor: cookieCategories.advertising ? 'rgba(243, 244, 246, 0.8)' : 'rgba(229, 231, 235, 0.5)',
                                 boxShadow: cookieCategories.advertising ? '0 0 1px rgba(79, 70, 229, 0.3)' : 'none'
                               }}>
                            <div 
                              className="w-4 h-4 rounded-full shadow-md transition-all duration-300 ease-in-out"
                              style={{
                                backgroundColor: cookieCategories.advertising ? 'rgba(79, 70, 229, 0.9)' : 'rgba(156, 163, 175, 0.9)',
                                marginLeft: cookieCategories.advertising ? 'auto' : '0',
                                transform: cookieCategories.advertising ? 'scale(1.05)' : 'scale(1)'
                              }}
                            />
                          </div>
                        </button>
                      </div>
                    </>
                  )}

                  {activeTab === 'cookies' && (
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm" style={{ color: settings.bannerTextColor || '#333333' }}>{getTranslatedText('cookieList', 'Cookie Liste')}</h3>
                      <p style={{ color: settings.bannerTextColor || '#333333' }}>
                        {getTranslatedText('cookieListDescription', 'Hier finden Sie eine detaillierte Liste aller Cookies, die wir auf unserer Website verwenden.')}
                      </p>
                      <div className="border border-gray-200 rounded-md mb-2 overflow-hidden p-3">
                        <h4 className="font-medium text-xs mb-2" style={{ color: settings.bannerTextColor || '#333333' }}>{getTranslatedText('necessaryCookies', 'Notwendige Cookies')}</h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span style={{ color: settings.bannerTextColor ? `${settings.bannerTextColor}99` : '#6b7280' }}>{getTranslatedText('cookieConsent', 'cookie_consent')}</span>
                            <span style={{ color: settings.bannerTextColor ? `${settings.bannerTextColor}99` : '#6b7280' }}>{getTranslatedText('cookieDuration', '1 Jahr')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span style={{ color: settings.bannerTextColor ? `${settings.bannerTextColor}99` : '#6b7280' }}>{getTranslatedText('sessionId', 'session_id')}</span>
                            <span style={{ color: settings.bannerTextColor ? `${settings.bannerTextColor}99` : '#6b7280' }}>{getTranslatedText('session', 'Session')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'policy' && (
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm" style={{ color: settings.bannerTextColor || '#333333' }}>{getTranslatedText('cookiePolicy', 'Cookie-Richtlinie')}</h3>
                      <p style={{ color: settings.bannerTextColor || '#333333' }}>
                        {getTranslatedText('cookiePolicyDescription', 'Diese Cookie-Richtlinie erläutert, wie wir Cookies und ähnliche Technologien auf unserer Website verwenden.')}
                      </p>
                      <p style={{ color: settings.bannerTextColor || '#333333' }}>
                        {getTranslatedText('cookieDescription', 'Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie unsere Website besuchen. Wir verwenden Cookies für eine Vielzahl von Zwecken, einschließlich der Verbesserung Ihrer Erfahrung, der Analyse der Websitenutzung und der Bereitstellung personalisierter Inhalte.')}
                      </p>
                    </div>
                  )}

                  {activeTab === 'mydata' && (
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm" style={{ color: settings.bannerTextColor || '#333333' }}>{getTranslatedText('myData', 'Meine Daten')}</h3>
                      <p style={{ color: settings.bannerTextColor || '#333333' }}>
                        {getTranslatedText('gdprRights', 'Nach der DSGVO haben Sie ein Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten.')}
                      </p>
                      <button 
                        type="button" 
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded"
                        style={{
                          backgroundColor: settings.buttonBgColor || '#4F46E5',
                          color: settings.buttonTextColor || 'white',
                          borderRadius: `${settings.buttonBorderRadius || 4}px`
                        }}
                      >
                        {getTranslatedText('requestData', 'Meine Daten anfordern')}
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Footer with buttons */}
                <div className="flex justify-between">
                  <div>
                    <button 
                      type="button" 
                      className="py-1.5 px-3 text-sm font-medium rounded-md"
                      style={{
                        backgroundColor: '#111827',
                        color: 'white',
                        borderRadius: `${settings.buttonBorderRadius || 4}px`
                      }}
                      onClick={toggleDetailedView}
                    >
                      {getTranslatedText('reject', 'Ablehnen')}
                    </button>
                  </div>
                  <div className="space-x-2">
                    <button 
                      type="button" 
                      className="py-1.5 px-3 text-sm font-medium rounded-md"
                      style={{
                        border: '1px solid #e2e8f0',
                        color: settings.bannerTextColor || '#333333',
                        borderRadius: `${settings.buttonBorderRadius || 4}px`,
                        backgroundColor: 'transparent'
                      }}
                    >
                      {getTranslatedText('saveSettings', 'Einstellungen speichern')}
                    </button>
                    <button 
                      type="button" 
                      className="py-1.5 px-3 text-sm font-medium rounded-md"
                      style={{
                        backgroundColor: settings.buttonBgColor || '#4F46E5',
                        color: settings.buttonTextColor || 'white',
                        borderRadius: `${settings.buttonBorderRadius || 4}px`
                      }}
                    >
                      {getTranslatedText('acceptAll', 'Alle akzeptieren')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}