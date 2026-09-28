import React from 'react';
import SettingsPanel from '../components/Settings/SettingsPanel';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Configure your dashboard preferences and bot settings</p>
      </div>
      
      {/* Settings Panel */}
      <SettingsPanel />
    </div>
  );
};

export default SettingsPage;
