import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import DashboardView from './components/dashboard/DashboardView';
import ReportsView from './components/reports/ReportsView';
import VoiceInputView from './components/voice/VoiceInputView';
import SettingsView from './components/settings/SettingsView';
import AddTransactionModal from './components/transactions/AddTransactionModal';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardView />;
      case 'reports':
        return <ReportsView />;
      case 'voice':
        return <VoiceInputView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main>
          {renderActiveView()}
        </main>
        <Navigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          openAddModal={() => setIsAddModalOpen(true)}
        />
        <AddTransactionModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      </div>
    </AppProvider>
  );
}

export default App;