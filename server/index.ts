import express, { Request, Response } from 'express';
import cors from 'cors';
import { Account, Task, LogEntry, Stats } from '../src/types';
import { mockAccounts, mockTasks, mockLogs, mockStats } from '../src/data/mockData';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data stores
let accounts: Account[] = [...mockAccounts];
let tasks: Task[] = [...mockTasks];
let logs: LogEntry[] = [...mockLogs];
let stats: Stats = { ...mockStats };

// Helper function to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Helper function to get current timestamp
const getCurrentTimestamp = () => {
  const now = new Date();
  return now.toTimeString().split(' ')[0];
};

// Helper function to add log entry
const addLog = (accountId: string, accountName: string, message: string, type: LogEntry['type']) => {
  const newLog: LogEntry = {
    id: generateId(),
    timestamp: getCurrentTimestamp(),
    accountId,
    accountName,
    message,
    type,
  };
  logs.unshift(newLog);
  if (logs.length > 100) logs.pop();
};

// API Routes

// Stats
app.get('/api/stats', (req: Request, res: Response) => {
  stats.activeBots = accounts.filter(a => a.status === 'running').length;
  stats.totalAccounts = accounts.length;
  res.json(stats);
});

// Accounts
app.get('/api/accounts', (req: Request, res: Response) => {
  res.json(accounts);
});

app.post('/api/accounts', (req: Request, res: Response) => {
  const { name, castleLevel, resources, proxy, status } = req.body;
  
  const newAccount: Account = {
    id: generateId(),
    name: name || `Account_${generateId()}`,
    castleLevel: castleLevel || 1,
    resources: resources || { wood: 0, food: 0, iron: 0 },
    proxy: proxy || '0.0.0.0:8080',
    status: status || 'idle',
    lastActive: new Date().toISOString(),
  };
  
  accounts.push(newAccount);
  addLog(newAccount.id, newAccount.name, 'Account added successfully', 'success');
  res.status(201).json(newAccount);
});

app.put('/api/accounts/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  
  const index = accounts.findIndex(a => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Account not found' });
  }
  
  accounts[index] = { ...accounts[index], ...updates };
  res.json(accounts[index]);
});

app.delete('/api/accounts/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const account = accounts.find(a => a.id === id);
  
  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }
  
  accounts = accounts.filter(a => a.id !== id);
  addLog(id, account.name, 'Account removed', 'info');
  res.status(204).send();
});

// Tasks
app.get('/api/tasks', (req: Request, res: Response) => {
  res.json(tasks);
});

app.post('/api/tasks', (req: Request, res: Response) => {
  const { accountId, accountName, type } = req.body;
  
  const newTask: Task = {
    id: generateId(),
    accountId,
    accountName,
    type,
    status: 'pending',
    progress: 0,
    createdAt: new Date().toISOString(),
  };
  
  tasks.push(newTask);
  addLog(accountId, accountName, `Task created: ${type.replace('_', ' ')}`, 'info');
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  tasks[index] = { ...tasks[index], ...updates };
  res.json(tasks[index]);
});

app.delete('/api/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id !== id);
  res.status(204).send();
});

// Bot Actions
app.post('/api/bot/start', (req: Request, res: Response) => {
  const { accountId } = req.body;
  
  if (accountId) {
    const account = accounts.find(a => a.id === accountId);
    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }
    
    account.status = 'running';
    account.lastActive = new Date().toISOString();
    addLog(accountId, account.name, 'Bot started', 'success');
    
    res.json({ success: true, message: `Bot started for ${account.name}` });
  } else {
    // Start all bots
    accounts.forEach(account => {
      if (account.status !== 'error') {
        account.status = 'running';
        account.lastActive = new Date().toISOString();
      }
    });
    addLog('system', 'System', 'All bots started', 'success');
    res.json({ success: true, message: 'All bots started' });
  }
});

app.post('/api/bot/stop', (req: Request, res: Response) => {
  const { accountId } = req.body;
  
  if (accountId) {
    const account = accounts.find(a => a.id === accountId);
    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }
    
    account.status = 'idle';
    addLog(accountId, account.name, 'Bot stopped', 'info');
    
    res.json({ success: true, message: `Bot stopped for ${account.name}` });
  } else {
    // Stop all bots
    accounts.forEach(account => {
      account.status = 'idle';
    });
    addLog('system', 'System', 'All bots stopped', 'info');
    res.json({ success: true, message: 'All bots stopped' });
  }
});

app.post('/api/bot/harvest', (req: Request, res: Response) => {
  const { accountId, tileId, resourceType } = req.body;
  
  const account = accounts.find(a => a.id === accountId);
  if (!account) {
    return res.status(404).json({ success: false, message: 'Account not found' });
  }
  
  // Placeholder for collectResourceFromGame function
  // In production, this would call: collectResourceFromGame(accountToken, tileId)
  const harvestAmount = Math.floor(Math.random() * 5000) + 1000;
  
  if (resourceType && account.resources[resourceType] !== undefined) {
    account.resources[resourceType] += harvestAmount;
    stats.resourcesGathered[resourceType] += harvestAmount;
  }
  
  addLog(accountId, account.name, `Harvested ${harvestAmount} ${resourceType || 'resources'} from Tile #${tileId || 'N/A'}`, 'success');
  
  res.json({
    success: true,
    message: `Harvested ${harvestAmount} ${resourceType || 'resources'}`,
    data: { amount: harvestAmount, tileId },
  });
});

app.post('/api/bot/train', (req: Request, res: Response) => {
  const { accountId } = req.body;
  
  const account = accounts.find(a => a.id === accountId);
  if (!account) {
    return res.status(404).json({ success: false, message: 'Account not found' });
  }
  
  addLog(accountId, account.name, 'Training troops initiated', 'info');
  
  res.json({ success: true, message: 'Troop training started' });
});

app.post('/api/bot/upgrade', (req: Request, res: Response) => {
  const { accountId } = req.body;
  
  const account = accounts.find(a => a.id === accountId);
  if (!account) {
    return res.status(404).json({ success: false, message: 'Account not found' });
  }
  
  account.castleLevel += 1;
  addLog(accountId, account.name, `Building upgraded! Castle Level: ${account.castleLevel}`, 'success');
  
  res.json({ success: true, message: 'Building upgrade completed' });
});

// Logs
app.get('/api/logs', (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 50;
  res.json(logs.slice(0, limit));
});

app.delete('/api/logs', (req: Request, res: Response) => {
  logs = [];
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
