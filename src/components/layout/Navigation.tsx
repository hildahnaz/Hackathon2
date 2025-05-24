import React from 'react';
import { Home, PieChart, Plus, Mic, Settings } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 ${
        active ? 'text-teal-600' : 'text-gray-500'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAddModal: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  activeTab, 
  setActiveTab,
  openAddModal
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
      <NavItem
        icon={<Home className="h-5 w-5" />}
        label="Home"
        active={activeTab === 'home'}
        onClick={() => setActiveTab('home')}
      />
      <NavItem
        icon={<PieChart className="h-5 w-5" />}
        label="Reports"
        active={activeTab === 'reports'}
        onClick={() => setActiveTab('reports')}
      />
      <div className="-mt-5">
        <button
          onClick={openAddModal}
          className="bg-teal-600 text-white p-3 rounded-full shadow-lg hover:bg-teal-700 transition-colors"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
      <NavItem
        icon={<Mic className="h-5 w-5" />}
        label="Voice"
        active={activeTab === 'voice'}
        onClick={() => setActiveTab('voice')}
      />
      <NavItem
        icon={<Settings className="h-5 w-5" />}
        label="Settings"
        active={activeTab === 'settings'}
        onClick={() => setActiveTab('settings')}
      />
    </nav>
  );
};

export default Navigation;