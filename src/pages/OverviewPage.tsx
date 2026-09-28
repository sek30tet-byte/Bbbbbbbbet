import React from 'react';
import { Users, Activity, TreePine, Wheat, Anvil, Zap } from 'lucide-react';
import StatsCard from '../components/Cards/StatsCard';
import ResourceCard from '../components/Cards/ResourceCard';
import QuickActionCard from '../components/Cards/QuickActionCard';
import { Stats } from '../types';

interface OverviewPageProps {
  stats: Stats | null;
  onStartAllBots: () => void;
  onStopAllBots: () => void;
  onGatherResources: () => void;
  loading?: boolean;
  activeAction?: string | null;
}

const OverviewPage: React.FC<OverviewPageProps> = ({
  stats,
  onStartAllBots,
  onStopAllBots,
  onGatherResources,
  loading = false,
  activeAction = null,
}) => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400 mt-1">Monitor your bot fleet and resource gathering progress</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Accounts"
          value={stats?.totalAccounts || 0}
          icon={Users}
          color="amber"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Active Bots"
          value={stats?.activeBots || 0}
          icon={Activity}
          color="green"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Farming Status"
          value={stats?.farmingStatus === 'active' ? 'Active' : stats?.farmingStatus === 'paused' ? 'Paused' : 'Idle'}
          icon={Zap}
          color="blue"
        />
        <StatsCard
          title="Total Resources"
          value={stats 
            ? `${((stats.resourcesGathered.wood + stats.resourcesGathered.food + stats.resourcesGathered.iron) / 1000000).toFixed(1)}M`
            : '0'
          }
          icon={TreePine}
          color="purple"
          trend={{ value: 25, isPositive: true }}
        />
      </div>
      
      {/* Quick Actions & Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActionCard
          onStartAll={onStartAllBots}
          onStopAll={onStopAllBots}
          onGatherResources={onGatherResources}
          loading={loading}
          activeAction={activeAction}
        />
        
        <ResourceCard
          wood={stats?.resourcesGathered.wood || 0}
          food={stats?.resourcesGathered.food || 0}
          iron={stats?.resourcesGathered.iron || 0}
        />
      </div>
    </div>
  );
};

export default OverviewPage;
