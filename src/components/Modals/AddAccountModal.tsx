import React from 'react';
import { X, User, Lock, Globe, Castle } from 'lucide-react';

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    castleLevel: number;
    proxy: string;
    email?: string;
    password?: string;
    token?: string;
  }) => void;
  editMode?: boolean;
  initialData?: {
    name: string;
    castleLevel: number;
    proxy: string;
  };
}

const AddAccountModal: React.FC<AddAccountModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editMode = false,
  initialData,
}) => {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || '',
    castleLevel: initialData?.castleLevel || 1,
    proxy: initialData?.proxy || '',
    authMethod: 'token' as 'token' | 'credentials',
    email: '',
    password: '',
    token: '',
  });
  
  React.useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        name: initialData.name,
        castleLevel: initialData.castleLevel,
        proxy: initialData.proxy,
      }));
    }
  }, [initialData]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      castleLevel: formData.castleLevel,
      proxy: formData.proxy,
      email: formData.authMethod === 'credentials' ? formData.email : undefined,
      password: formData.authMethod === 'credentials' ? formData.password : undefined,
      token: formData.authMethod === 'token' ? formData.token : undefined,
    });
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            {editMode ? 'Edit Account' : 'Add New Account'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Account Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Account Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Empire_Master_01"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>
          </div>
          
          {/* Castle Level */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Castle Level
            </label>
            <div className="relative">
              <Castle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="number"
                value={formData.castleLevel}
                onChange={(e) => setFormData({ ...formData, castleLevel: parseInt(e.target.value) || 1 })}
                min={1}
                max={30}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>
          </div>
          
          {/* Proxy */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Proxy / IP Address
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={formData.proxy}
                onChange={(e) => setFormData({ ...formData, proxy: e.target.value })}
                placeholder="192.168.1.100:8080"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>
          
          {/* Auth Method Toggle */}
          {!editMode && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Authentication Method
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, authMethod: 'token' })}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    formData.authMethod === 'token'
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  Account Token
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, authMethod: 'credentials' })}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    formData.authMethod === 'credentials'
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  Email & Password
                </button>
              </div>
            </div>
          )}
          
          {/* Token Input */}
          {!editMode && formData.authMethod === 'token' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Account Token
              </label>
              <input
                type="text"
                value={formData.token}
                onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                placeholder="Enter your account token"
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>
          )}
          
          {/* Email & Password Inputs */}
          {!editMode && formData.authMethod === 'credentials' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>
            </>
          )}
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-medium rounded-lg transition-all duration-200"
          >
            {editMode ? 'Save Changes' : 'Add Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAccountModal;
