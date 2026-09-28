import React from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import AccountsTable from '../components/Tables/AccountsTable';
import AddAccountModal from '../components/Modals/AddAccountModal';
import { Account } from '../types';

interface AccountsPageProps {
  accounts: Account[];
  onRefresh: () => void;
  onAddAccount: (data: {
    name: string;
    castleLevel: number;
    proxy: string;
    email?: string;
    password?: string;
    token?: string;
  }) => void;
  onStartBot: (accountId: string) => void;
  onStopBot: (accountId: string) => void;
  onDeleteAccount: (accountId: string) => void;
  onEditAccount: (account: Account) => void;
  loading?: boolean;
}

const AccountsPage: React.FC<AccountsPageProps> = ({
  accounts,
  onRefresh,
  onAddAccount,
  onStartBot,
  onStopBot,
  onDeleteAccount,
  onEditAccount,
  loading = false,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [editData, setEditData] = React.useState<Account | null>(null);
  
  const handleEditAccount = (account: Account) => {
    setEditMode(true);
    setEditData(account);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setEditData(null);
  };
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Account Management</h1>
          <p className="text-gray-400 mt-1">Manage your game accounts and bot configurations</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          
          <button
            onClick={() => {
              setEditMode(false);
              setEditData(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-medium rounded-lg transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Account</span>
          </button>
        </div>
      </div>
      
      {/* Accounts Table */}
      <AccountsTable
        accounts={accounts}
        onStartBot={onStartBot}
        onStopBot={onStopBot}
        onDeleteAccount={onDeleteAccount}
        onEditAccount={handleEditAccount}
      />
      
      {/* Add/Edit Modal */}
      <AddAccountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={(data) => {
          onAddAccount(data);
          handleCloseModal();
        }}
        editMode={editMode}
        initialData={editData ? {
          name: editData.name,
          castleLevel: editData.castleLevel,
          proxy: editData.proxy,
        } : undefined}
      />
    </div>
  );
};

export default AccountsPage;
