import React from 'react';
import TaskPanel from '../components/TaskManager/TaskPanel';
import { Task } from '../types';

interface TaskManagerPageProps {
  tasks: Task[];
  onCreateTask: (type: Task['type']) => void;
  loading?: boolean;
}

const TaskManagerPage: React.FC<TaskManagerPageProps> = ({
  tasks,
  onCreateTask,
  loading = false,
}) => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Task Manager</h1>
        <p className="text-gray-400 mt-1">Create and manage bot tasks for your accounts</p>
      </div>
      
      {/* Task Panel */}
      <TaskPanel
        tasks={tasks}
        onCreateTask={onCreateTask}
        loading={loading}
      />
    </div>
  );
};

export default TaskManagerPage;
