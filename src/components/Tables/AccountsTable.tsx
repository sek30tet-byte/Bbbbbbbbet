import React from 'react';
import { 
  Users, 
  Castle, 
  TreePine, 
  Wheat, 
  Anvil, 
  Globe, 
  Circle,
  MoreVertical,
  Play,
  Square,
  Trash2,
  Edit
} from 'lucide-react';
import { Account } from '../../types';

interface AccountsTableProps {
  accounts: Account[];
  onStartBot: (accountId: string) => void;
  onStopBot: (accountId: string) => void;
  onDeleteAccount: (accountId: string) => void;
  onEditAccount: (account: Account) => void;
}

const statusColors = {
  running: 'text-green-400 bg-green-500/10',
  idle: 'text-yellow-400 bg-yellow-500/10',
  error: 'text-red-400 bg-red-500/10',
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const AccountsTable: React.FC<AccountsTableProps> = ({
  accounts,
  onStartBot,
  onStopBot,
  onDeleteAccount,
  onEditAccount,
}) => {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700 bg-gray-800/50">
              <th className="text-left px-4 sm:px-6 py-4 text-sm font-medium text-gray-400">
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span className="hidden sm:inline">Account</span>
                </div>
              </th>
              <th className="text-left px-4 sm:px-6 py-4 text-sm font-medium text-gray-400">
                <div className="flex items-center gap-2">
                  <Castle size={16} />
                  <span>Level</span>
                </div>
              </th>
              <th className="text-left px-4 sm:px-6 py-4 text-sm font-medium text-gray-400 hidden md:table-cell">
                <div className="flex items-center gap-2">
                  <span>Resources</span>
                </div>
              </th>
              <th className="text-left px-4 sm:px-6 py-4 text-sm font-medium text-gray-400 hidden lg:table-cell">
                <div className="flex items-center gap-2">
                  <Globe size={16} />
                  <span>Proxy</span>
                </div>
              </th>
              <th className="text-left px-4 sm:px-6 py-4 text-sm font-medium text-gray-400">
                <div className="flex items-center gap-2">
                  <Circle size={16} />
                  <span>Status</span>
                </div>
              </th>
              <th className="text-right px-4 sm:px-6 py-4 text-sm font-medium text-gray-400">
                <span>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr 
                key={account.id}
                className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
              >
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {account.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm sm:text-base">{account.name}</p>
                      <p className="text-xs text-gray-500 sm:hidden">
                        Lvl {account.castleLevel} • {account.status}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-medium">{account.castleLevel}</span>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-green-400">
                      <TreePine size={12} />
                      {formatNumber(account.resources.wood)}
                    </span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Wheat size={12} />
                      {formatNumber(account.resources.food)}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <Anvil size={12} />
                      {formatNumber(account.resources.iron)}
                    </span>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                  <span className="text-gray-400 text-sm font-mono">{account.proxy}</span>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[account.status]}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${account.status === 'running' ? 'bg-current animate-pulse' : 'bg-current'}`} />
                    <span className="capitalize">{account.status}</span>
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {account.status === 'running' ? (
                      <button
                        onClick={() => onStopBot(account.id)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Stop Bot"
                      >
                        <Square size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => onStartBot(account.id)}
                        className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                        title="Start Bot"
                      >
                        <Play size={16} />
                      </button>
                    )}
                    
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === account.id ? null : account.id)}
                        className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <MoreVertical size={16} />
                      </button>
                      
                      {openMenu === account.id && (
                        <div className="absolute right-0 top-full mt-1 w-36 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                          <button
                            onClick={() => {
                              onEditAccount(account);
                              setOpenMenu(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-t-lg"
                          >
                            <Edit size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              onDeleteAccount(account.id);
                              setOpenMenu(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-b-lg"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {accounts.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No accounts found</p>
          <p className="text-sm text-gray-500">Add an account to get started</p>
        </div>
      )}
    </div>
  );
};

export default AccountsTable;
