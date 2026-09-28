import React from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import OverviewPage from './pages/OverviewPage';
import AccountsPage from './pages/AccountsPage';
import TaskManagerPage from './pages/TaskManagerPage';
import LogsPage from './pages/LogsPage';
import SettingsPage from './pages/SettingsPage';
import { Account, Task, LogEntry, Stats } from './types';
import { mockAccounts, mockTasks, mockLogs, mockStats } from './data/mockData';
import { startBot, stopBot, startAllBots, stopAllBots, harvestResource, trainTroops, upgradeBuilding } from './api/bot';

function App() {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [accounts, setAccounts] = React.useState<Account[]>(mockAccounts);
  const [tasks, setTasks] = React.useState<Task[]>(mockTasks);
  const [logs, setLogs] = React.useState<LogEntry[]>(mockLogs);
  const [stats, setStats] = React.useState<Stats>(mockStats);
  const [loading, setLoading] = React.useState(false);
  const [activeAction, setActiveAction] = React.useState<string | null>(null);
  
  // Simulate real-time log updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (accounts.some(a => a.status === 'running')) {
        const runningAccounts = accounts.filter(a => a.status === 'running');
        const randomAccount = runningAccounts[Math.floor(Math.random() * runningAccounts.length)];
        
        const messages = [
          { message: `Sent troops to Wood Tile #${Math.floor(Math.random() * 50000)}`, type: 'success' as const },
          { message: `Harvesting Food from Tile #${Math.floor(Math.random() * 50000)}`, type: 'info' as const },
          { message: `Training troops completed`, type: 'success' as const },
          { message: `Collecting Iron from Tile #${Math.floor(Math.random() * 50000)}`, type: 'info' as const },
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const newLog: LogEntry = {
          id: Date.now().toString(),
          timestamp: new Date().toTimeString().split(' ')[0],
          accountId: randomAccount.id,
          accountName: randomAccount.name,
          message: randomMessage.message,
          type: randomMessage.type,
        };
        
        setLogs(prev => [newLog, ...prev].slice(0, 100));
        
        // Update resources
        setAccounts(prev => prev.map(acc => {
          if (acc.id === randomAccount.id) {
            const resourceKey = ['wood', 'food', 'iron'][Math.floor(Math.random() * 3)] as 'wood' | 'food' | 'iron';
            return {
              ...acc,
              resources: {
                ...acc.resources,
                [resourceKey]: acc.resources[resourceKey] + Math.floor(Math.random() * 500) + 100,
              },
            };
          }
          return acc;
        }));
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [accounts]);
  
  // Update stats when accounts change
  React.useEffect(() => {
    setStats(prev => ({
      ...prev,
      totalAccounts: accounts.length,
      activeBots: accounts.filter(a => a.status === 'running').length,
      resourcesGathered: {
        wood: accounts.reduce((sum, a) => sum + a.resources.wood, 0),
        food: accounts.reduce((sum, a) => sum + a.resources.food, 0),
        iron: accounts.reduce((sum, a) => sum + a.resources.iron, 0),
      },
    }));
  }, [accounts]);
  
  const handleStartAllBots = async () => {
    setLoading(true);
    setActiveAction('start');
    try {
      await startAllBots();
      setAccounts(prev => prev.map(acc => ({
        ...acc,
        status: acc.status !== 'error' ? 'running' as const : acc.status,
        lastActive: new Date().toISOString(),
      })));
      addLog('system', 'System', 'All bots started', 'success');
    } catch (error) {
      console.error('Failed to start all bots:', error);
    } finally {
      setLoading(false);
      setActiveAction(null);
    }
  };
  
  const handleStopAllBots = async () => {
    setLoading(true);
    setActiveAction('stop');
    try {
      await stopAllBots();
      setAccounts(prev => prev.map(acc => ({ ...acc, status: 'idle' as const })));
      addLog('system', 'System', 'All bots stopped', 'info');
    } catch (error) {
      console.error('Failed to stop all bots:', error);
    } finally {
      setLoading(false);
      setActiveAction(null);
    }
  };
  
  const handleGatherResources = async () => {
    setLoading(true);
    setActiveAction('gather');
    try {
      const runningAccounts = accounts.filter(a => a.status === 'running');
      for (const account of runningAccounts) {
        await harvestResource(account.id, Math.floor(Math.random() * 50000).toString(), 'wood');
      }
      addLog('system', 'System', 'Resource gathering initiated for all active bots', 'success');
    } catch (error) {
      console.error('Failed to gather resources:', error);
    } finally {
      setLoading(false);
      setActiveAction(null);
    }
  };
  
  const handleStartBot = async (accountId: string) => {
    try {
      await startBot(accountId);
      setAccounts(prev => prev.map(acc => 
        acc.id === accountId ? { ...acc, status: 'running' as const, lastActive: new Date().toISOString() } : acc
      ));
      const account = accounts.find(a => a.id === accountId);
      if (account) {
        addLog(accountId, account.name, 'Bot started', 'success');
      }
    } catch (error) {
      console.error('Failed to start bot:', error);
    }
  };
  
  const handleStopBot = async (accountId: string) => {
    try {
      await stopBot(accountId);
      setAccounts(prev => prev.map(acc => 
        acc.id === accountId ? { ...acc, status: 'idle' as const } : acc
      ));
      const account = accounts.find(a => a.id === accountId);
      if (account) {
        addLog(accountId, account.name, 'Bot stopped', 'info');
      }
    } catch (error) {
      console.error('Failed to stop bot:', error);
    }
  };
  
  const handleAddAccount = async (data: {
    name: string;
    castleLevel: number;
    proxy: string;
    email?: string;
    password?: string;
    token?: string;
  }) => {
    const newAccount: Account = {
      id: Date.now().toString(),
      name: data.name,
      castleLevel: data.castleLevel,
      resources: { wood: 0, food: 0, iron: 0 },
      proxy: data.proxy || '0.0.0.0:8080',
      status: 'idle',
      lastActive: new Date().toISOString(),
    };
    setAccounts(prev => [...prev, newAccount]);
    addLog(newAccount.id, newAccount.name, 'Account added successfully', 'success');
  };
  
  const handleDeleteAccount = async (accountId: string) => {
    const account = accounts.find(a => a.id === accountId);
    setAccounts(prev => prev.filter(a => a.id !== accountId));
    if (account) {
      addLog(accountId, account.name, 'Account removed', 'info');
    }
  };
  
  const handleEditAccount = (account: Account) => {
    // In a real app, this would open a modal
    console.log('Edit account:', account);
  };
  
  const handleCreateTask = async (type: Task['type']) => {
    const runningAccounts = accounts.filter(a => a.status === 'running');
    if (runningAccounts.length === 0) {
      addLog('system', 'System', 'No active bots to create tasks', 'warning');
      return;
    }
    
    const randomAccount = runningAccounts[Math.floor(Math.random() * runningAccounts.length)];
    
    const newTask: Task = {
      id: Date.now().toString(),
      accountId: randomAccount.id,
      accountName: randomAccount.name,
      type,
      status: 'pending',
      progress: 0,
      createdAt: new Date().toISOString(),
    };
    
    setTasks(prev => [...prev, newTask]);
    addLog(randomAccount.id, randomAccount.name, `Task created: ${type.replace('_', ' ')}`, 'info');
    
    // Simulate task progress
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        setTasks(prev => prev.map(t => 
          t.id === newTask.id ? { ...t, status: 'completed' as const, progress: 100 } : t
        ));
        addLog(randomAccount.id, randomAccount.name, `Task completed: ${type.replace('_', ' ')}`, 'success');
      } else {
        setTasks(prev => prev.map(t => 
          t.id === newTask.id ? { ...t, status: 'running' as const, progress: Math.floor(progress) } : t
        ));
      }
    }, 1000);
  };
  
  const addLog = (accountId: string, accountName: string, message: string, type: LogEntry['type']) => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toTimeString().split(' ')[0],
      accountId,
      accountName,
      message,
      type,
    };
    setLogs(prev => [newLog, ...prev].slice(0, 100));
  };
  
  const handleClearLogs = () => {
    setLogs([]);
  };
  
  const renderPage = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewPage
            stats={stats}
            onStartAllBots={handleStartAllBots}
            onStopAllBots={handleStopAllBots}
            onGatherResources={handleGatherResources}
            loading={loading}
            activeAction={activeAction}
          />
        );
      case 'accounts':
        return (
          <AccountsPage
            accounts={accounts}
            onRefresh={() => {}}
            onAddAccount={handleAddAccount}
            onStartBot={handleStartBot}
            onStopBot={handleStopBot}
            onDeleteAccount={handleDeleteAccount}
            onEditAccount={handleEditAccount}
            loading={loading}
          />
        );
      case 'tasks':
        return (
          <TaskManagerPage
            tasks={tasks.filter(t => t.status === 'running' || t.status === 'pending')}
            onCreateTask={handleCreateTask}
            loading={loading}
          />
        );
      case 'logs':
        return (
          <LogsPage
            logs={logs}
            onClearLogs={handleClearLogs}
          />
        );
      case 'settings':
        return <SettingsPage />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <Header />
        
        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
