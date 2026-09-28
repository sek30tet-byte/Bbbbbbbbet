import React from 'react';
import { 
  Moon, 
  Bell, 
  Shield, 
  Globe, 
  Clock, 
  Save,
  Volume2,
  VolumeX
} from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = React.useState({
    darkMode: true,
    notifications: true,
    soundAlerts: false,
    autoRefresh: true,
    refreshInterval: 5,
    logRetention: 7,
  });
  
  return (
    <div className="space-y-6">
      {/* Appearance */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Moon className="w-5 h-5 text-amber-400" />
          Appearance
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Dark Mode</p>
              <p className="text-sm text-gray-400">Use dark theme for the dashboard</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, darkMode: !settings.darkMode })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.darkMode ? 'bg-amber-500' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                settings.darkMode ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Notifications */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-400" />
          Notifications
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Push Notifications</p>
              <p className="text-sm text-gray-400">Receive notifications for important events</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.notifications ? 'bg-amber-500' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                settings.notifications ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settings.soundAlerts ? (
                <Volume2 className="w-5 h-5 text-gray-400" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <p className="text-white font-medium">Sound Alerts</p>
                <p className="text-sm text-gray-400">Play sound on important events</p>
              </div>
            </div>
            <button
              onClick={() => setSettings({ ...settings, soundAlerts: !settings.soundAlerts })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.soundAlerts ? 'bg-amber-500' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                settings.soundAlerts ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Performance */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-400" />
          Performance
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Auto Refresh</p>
              <p className="text-sm text-gray-400">Automatically refresh data</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, autoRefresh: !settings.autoRefresh })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.autoRefresh ? 'bg-amber-500' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                settings.autoRefresh ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">
              Refresh Interval (seconds)
            </label>
            <input
              type="range"
              min={1}
              max={30}
              value={settings.refreshInterval}
              onChange={(e) => setSettings({ ...settings, refreshInterval: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>1s</span>
              <span>{settings.refreshInterval}s</span>
              <span>30s</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Security */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-400" />
          Security
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">
              Log Retention (days)
            </label>
            <select
              value={settings.logRetention}
              onChange={(e) => setSettings({ ...settings, logRetention: parseInt(e.target.value) })}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
            >
              <option value={1}>1 day</option>
              <option value={7}>7 days</option>
              <option value={14}>14 days</option>
              <option value={30}>30 days</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Save Button */}
      <button className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-medium rounded-lg transition-all duration-200">
        <Save size={18} />
        Save Settings
      </button>
    </div>
  );
};

export default SettingsPanel;
