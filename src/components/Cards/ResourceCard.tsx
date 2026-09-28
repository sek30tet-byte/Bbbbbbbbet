import React from 'react';
import { TreePine, Wheat, Anvil } from 'lucide-react';

interface ResourceCardProps {
  wood: number;
  food: number;
  iron: number;
}

const resources = [
  { key: 'wood', label: 'Wood', icon: TreePine, color: 'text-green-400', bg: 'bg-green-500/10' },
  { key: 'food', label: 'Food', icon: Wheat, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { key: 'iron', label: 'Iron', icon: Anvil, color: 'text-gray-400', bg: 'bg-gray-500/10' },
] as const;

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const ResourceCard: React.FC<ResourceCardProps> = ({ wood, food, iron }) => {
  const resourceValues = { wood, food, iron };
  
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white mb-4">Resources Gathered</h3>
      
      <div className="space-y-4">
        {resources.map((resource) => {
          const Icon = resource.icon;
          const value = resourceValues[resource.key];
          
          return (
            <div key={resource.key} className="flex items-center gap-4">
              <div className={`w-10 h-10 ${resource.bg} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${resource.color}`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">{resource.label}</span>
                  <span className="text-sm font-medium text-white">{formatNumber(value)}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${resource.bg.replace('/10', '')} rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min((value / 2000000) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResourceCard;
