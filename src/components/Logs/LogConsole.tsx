import React from 'react';
import { Terminal, Trash2, Download, Filter } from 'lucide-react';
import { LogEntry } from '../../types';

interface LogConsoleProps {
  logs: LogEntry[];
  onClearLogs: () => void;
}

const logTypeColors = {
  info: 'text-blue-400',
  success: 'text-green-400',
  warning: 'text-yellow-400',
  error: 'text-red-400',
};

const LogConsole: React.FC<LogConsoleProps> = ({ logs, onClearLogs }) => {
  const [filter, setFilter] = React.useState<LogEntry['type'] | 'all'>('all');
  const logEndRef = React.useRef<HTMLDivElement>(null);
  
  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.type === filter);
  
  React.useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);
  
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-green-400" />
          <span className="font-medium text-white">Live Logs</span>
          <span className="text-xs text-gray-500 bg-gray-700 px-2 py-0.5 rounded-full">
            {filteredLogs.length} entries
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as LogEntry['type'] | 'all')}
              className="pl-8 pr-4 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
          
          <button
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            title="Download Logs"
          >
            <Download size={16} />
          </button>
          
          <button
            onClick={onClearLogs}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
            title="Clear Logs"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      {/* Console */}
      <div className="h-96 overflow-y-auto p-4 font-mono text-sm bg-gray-950">
        {filteredLogs.map((log) => (
          <div 
            key={log.id}
            className="flex items-start gap-3 py-2 border-b border-gray-800/50 last:border-0"
          >
            <span className="text-gray-500 shrink-0">[{log.timestamp}]</span>
            <span className="text-amber-400 shrink-0">[{log.accountName}]</span>
            <span className={`${logTypeColors[log.type]}`}>
              {log.message}
            </span>
          </div>
        ))}
        
        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <Terminal className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500">No logs to display</p>
          </div>
        )}
        
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export default LogConsole;
