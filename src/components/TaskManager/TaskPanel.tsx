import React from 'react';
import { 
  TreePine, 
  Wheat, 
  Anvil, 
  Swords, 
  Building2,
  Loader2,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Task } from '../../types';

interface TaskPanelProps {
  tasks: Task[];
  onCreateTask: (type: Task['type']) => void;
  loading?: boolean;
}

const taskTypes = [
  { id: 'harvest_wood', label: 'Harvest Wood', icon: TreePine, color: 'text-green-400 bg-green-500/10' },
  { id: 'harvest_food', label: 'Harvest Food', icon: Wheat, color: 'text-amber-400 bg-amber-500/10' },
  { id: 'harvest_iron', label: 'Harvest Iron', icon: Anvil, color: 'text-gray-400 bg-gray-500/10' },
  { id: 'train_troops', label: 'Train Troops', icon: Swords, color: 'text-red-400 bg-red-500/10' },
  { id: 'upgrade_building', label: 'Upgrade Building', icon: Building2, color: 'text-blue-400 bg-blue-500/10' },
] as const;

const statusIcons = {
  pending: Clock,
  running: Loader2,
  completed: CheckCircle2,
  failed: AlertCircle,
};

const statusColors = {
  pending: 'text-yellow-400',
  running: 'text-blue-400',
  completed: 'text-green-400',
  failed: 'text-red-400',
};

const TaskPanel: React.FC<TaskPanelProps> = ({ tasks, onCreateTask, loading = false }) => {
  return (
    <div className="space-y-6">
      {/* Task Creation Buttons */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-white mb-4">Create New Task</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {taskTypes.map((task) => {
            const Icon = task.icon;
            
            return (
              <button
                key={task.id}
                onClick={() => onCreateTask(task.id as Task['type'])}
                disabled={loading}
                className="flex flex-col items-center gap-2 p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-xl transition-all duration-200 disabled:opacity-50"
              >
                <div className={`w-12 h-12 ${task.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm text-gray-300 text-center">{task.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Active Tasks */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-white mb-4">Active Tasks</h3>
        
        <div className="space-y-3">
          {tasks.map((task) => {
            const StatusIcon = statusIcons[task.status];
            const taskType = taskTypes.find(t => t.id === task.type);
            
            return (
              <div 
                key={task.id}
                className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50"
              >
                <div className={`w-10 h-10 ${taskType?.color || 'bg-gray-500/10'} rounded-lg flex items-center justify-center`}>
                  {taskType && <taskType.icon className="w-5 h-5" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-white">{task.accountName}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-sm text-gray-400 capitalize">
                      {task.type.replace('_', ' ')}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  {task.status === 'running' && (
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                
                <div className={`flex items-center gap-1.5 ${statusColors[task.status]}`}>
                  <StatusIcon className={`w-4 h-4 ${task.status === 'running' ? 'animate-spin' : ''}`} />
                  <span className="text-sm capitalize">{task.status}</span>
                </div>
              </div>
            );
          })}
          
          {tasks.length === 0 && (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No active tasks</p>
              <p className="text-sm text-gray-500">Create a task to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskPanel;
