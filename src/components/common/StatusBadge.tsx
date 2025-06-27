import React from 'react';
import { Issue } from '../../types';

interface StatusBadgeProps {
  status: Issue['status'];
  priority?: Issue['priority'];
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, priority, size = 'md' }) => {
  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case 'reported':
        return 'bg-blue-100 text-blue-800';
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Issue['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSizeClasses = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'md':
        return 'px-2.5 py-1.5 text-sm';
      case 'lg':
        return 'px-3 py-2 text-base';
      default:
        return 'px-2.5 py-1.5 text-sm';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="flex flex-wrap gap-2">
      <span className={`inline-flex items-center font-medium rounded-full ${getStatusColor(status)} ${getSizeClasses(size)}`}>
        {formatStatus(status)}
      </span>
      {priority && (
        <span className={`inline-flex items-center font-medium rounded-full ${getPriorityColor(priority)} ${getSizeClasses(size)}`}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
        </span>
      )}
    </div>
  );
};