import React from 'react';
import { Play, Square, Loader2 } from 'lucide-react';

interface QuickActionCardProps {
  onStartAll: () => void;
  onStopAll: () => void;
  onGatherResources: () => void;
  loading?: boolean;
  activeAction?: string | null;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  onStartAll,
  onStopAll,
  onGatherResources,
  loading = false,
  activeAction = null,
}) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={onStartAll}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
        >
          {loading && activeAction === 'start' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Play className="w-5 h-5" />
          )}
          <span>Start All</span>
        </button>
        
        <button
          onClick={onStopAll}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
        >
          {loading && activeAction === 'stop' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Square className="w-5 h-5" />
          )}
          <span>Stop All</span>
        </button>
        
        <button
          onClick={onGatherResources}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
        >
          {loading && activeAction === 'gather' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Play className="w-5 h-5" />
          )}
          <span>Gather Now</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActionCard;
