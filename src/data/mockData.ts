import { Account, Task, LogEntry, Stats } from '../types';

export const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Empire_Master_01',
    castleLevel: 25,
    resources: { wood: 125000, food: 89000, iron: 45600 },
    proxy: '192.168.1.101:8080',
    status: 'running',
    lastActive: '2025-01-15 10:30:00',
  },
  {
    id: '2',
    name: 'Warlord_Alpha',
    castleLevel: 22,
    resources: { wood: 98000, food: 112000, iron: 32000 },
    proxy: '192.168.1.102:8080',
    status: 'running',
    lastActive: '2025-01-15 10:28:00',
  },
  {
    id: '3',
    name: 'Castle_King_99',
    castleLevel: 18,
    resources: { wood: 45000, food: 67000, iron: 21000 },
    proxy: '192.168.1.103:8080',
    status: 'idle',
    lastActive: '2025-01-15 09:15:00',
  },
  {
    id: '4',
    name: 'Knight_Protector',
    castleLevel: 20,
    resources: { wood: 78000, food: 54000, iron: 38000 },
    proxy: '192.168.1.104:8080',
    status: 'error',
    lastActive: '2025-01-14 23:45:00',
  },
  {
    id: '5',
    name: 'Empire_Queen_05',
    castleLevel: 28,
    resources: { wood: 210000, food: 185000, iron: 92000 },
    proxy: '192.168.1.105:8080',
    status: 'running',
    lastActive: '2025-01-15 10:31:00',
  },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    accountId: '1',
    accountName: 'Empire_Master_01',
    type: 'harvest_wood',
    status: 'running',
    progress: 65,
    createdAt: '2025-01-15 10:00:00',
  },
  {
    id: '2',
    accountId: '2',
    accountName: 'Warlord_Alpha',
    type: 'train_troops',
    status: 'pending',
    progress: 0,
    createdAt: '2025-01-15 10:05:00',
  },
  {
    id: '3',
    accountId: '5',
    accountName: 'Empire_Queen_05',
    type: 'upgrade_building',
    status: 'running',
    progress: 80,
    createdAt: '2025-01-15 09:30:00',
  },
];

export const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: '10:31:45',
    accountId: '1',
    accountName: 'Empire_Master_01',
    message: 'Sent troops to Wood Tile #40521',
    type: 'success',
  },
  {
    id: '2',
    timestamp: '10:30:22',
    accountId: '5',
    accountName: 'Empire_Queen_05',
    message: 'Building upgrade completed: Barracks Level 12',
    type: 'success',
  },
  {
    id: '3',
    timestamp: '10:28:15',
    accountId: '2',
    accountName: 'Warlord_Alpha',
    message: 'Harvesting Food from Tile #38920',
    type: 'info',
  },
  {
    id: '4',
    timestamp: '10:25:00',
    accountId: '4',
    accountName: 'Knight_Protector',
    message: 'Connection timeout - retrying in 30 seconds',
    type: 'warning',
  },
  {
    id: '5',
    timestamp: '10:20:33',
    accountId: '1',
    accountName: 'Empire_Master_01',
    message: 'Iron collection complete: +5,200 iron',
    type: 'success',
  },
  {
    id: '6',
    timestamp: '10:15:00',
    accountId: '4',
    accountName: 'Knight_Protector',
    message: 'Failed to connect to game server',
    type: 'error',
  },
  {
    id: '7',
    timestamp: '10:10:12',
    accountId: '3',
    accountName: 'Castle_King_99',
    message: 'Bot paused by user',
    type: 'info',
  },
];

export const mockStats: Stats = {
  totalAccounts: 5,
  activeBots: 3,
  resourcesGathered: {
    wood: 1250000,
    food: 980000,
    iron: 456000,
  },
  farmingStatus: 'active',
};
