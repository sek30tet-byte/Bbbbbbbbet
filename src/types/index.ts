export interface Account {
  id: string;
  name: string;
  castleLevel: number;
  resources: {
    wood: number;
    food: number;
    iron: number;
  };
  proxy: string;
  status: 'running' | 'idle' | 'error';
  lastActive: string;
}

export interface Task {
  id: string;
  accountId: string;
  accountName: string;
  type: 'harvest_wood' | 'harvest_food' | 'harvest_iron' | 'train_troops' | 'upgrade_building';
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  accountId: string;
  accountName: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface Stats {
  totalAccounts: number;
  activeBots: number;
  resourcesGathered: {
    wood: number;
    food: number;
    iron: number;
  };
  farmingStatus: 'active' | 'paused' | 'idle';
}
