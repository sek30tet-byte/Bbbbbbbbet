import React from 'react';
import LogConsole from '../components/Logs/LogConsole';
import { LogEntry } from '../types';

interface LogsPageProps {
  logs: LogEntry[];
  onClearLogs: () => void;
}

const LogsPage: React.FC<LogsPageProps> = ({
  logs,
  onClearLogs,
}) => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Real-time Logs</h1>
        <p className="text-gray-400 mt-1">Monitor bot activity and system events in real-time</p>
      </div>
      
      {/* Log Console */}
      <LogConsole
        logs={logs}
        onClearLogs={onClearLogs}
      />
    </div>
  );
};

export default LogsPage;
