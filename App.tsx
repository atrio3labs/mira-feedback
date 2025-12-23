import React, { useState, useEffect } from 'react';
import { AppProvider } from './services/AppContext';
import { Navigation } from './components/Navigation';
import { FeedbackBoard } from './pages/FeedbackBoard';
import { Roadmap } from './pages/Roadmap';
import { Changelog } from './pages/Changelog';
import { FeedbackModal } from './components/FeedbackModal';
import { FeedbackDetailModal } from './components/FeedbackDetailModal';

const App: React.FC = () => {
  const getRouteFromHash = (hash: string) => {
    if (!hash) return '#/';
    return hash.split('?')[0];
  };

  const [currentRoute, setCurrentRoute] = useState(getRouteFromHash(window.location.hash));
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      let hash = window.location.hash;
      if (!hash) hash = '#/';
      setCurrentRoute(getRouteFromHash(hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    switch (currentRoute) {
      case '#/roadmap':
        return <Roadmap />;
      case '#/changelog':
        return <Changelog />;
      case '#/':
      default:
        return <FeedbackBoard />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen font-sans bg-transparent">
        <Navigation onOpenModal={() => setIsModalOpen(true)} currentRoute={currentRoute} />
        
        {/* Main Content Area */}
        <main className="md:pl-64 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-20 pb-24 md:py-10">
            {renderContent()}
          </div>
        </main>

        <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <FeedbackDetailModal />
      </div>
    </AppProvider>
  );
};

export default App;
