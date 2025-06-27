import React, { useState } from 'react';
import { Home, AlertCircle, BookOpen, Menu, X, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Header } from '../components/common/Header';
import { CitizenDashboard } from '../components/citizen/CitizenDashboard';
import { VolunteerDashboard } from '../components/volunteer/VolunteerDashboard';
import { EducationHub } from '../components/education/EducationHub';
import { MapDemo } from '../components/common/MapDemo';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const citizenTabs = [
    { id: 'dashboard', label: 'My Dashboard', icon: Home },
    { id: 'map-demo', label: 'Map Demo', icon: MapPin },
    { id: 'education', label: 'Education Hub', icon: BookOpen },
  ];

  const volunteerTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'map-demo', label: 'Map Demo', icon: MapPin },
    { id: 'education', label: 'Education Hub', icon: BookOpen },
  ];

  const tabs = user?.userType === 'citizen' ? citizenTabs : volunteerTabs;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return user?.userType === 'citizen' ? <CitizenDashboard /> : <VolunteerDashboard />;
      case 'map-demo':
        return <MapDemo />;
      case 'education':
        return <EducationHub />;
      default:
        return user?.userType === 'citizen' ? <CitizenDashboard /> : <VolunteerDashboard />;
    }
  };

  const getPageTitle = () => {
    const tab = tabs.find(t => t.id === activeTab);
    return tab ? tab.label : 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title={getPageTitle()}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        showMenuToggle={true}
      />

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-6 border-b md:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-6 md:mt-0 px-4">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${activeTab === tab.id
                        ? 'bg-emerald-100 text-emerald-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="absolute bottom-6 left-4 right-4">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg p-4 text-white">
              <h3 className="font-medium mb-1">Community Impact</h3>
              <p className="text-sm text-emerald-100">Together we're building better rural infrastructure for everyone.</p>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 md:ml-0">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};