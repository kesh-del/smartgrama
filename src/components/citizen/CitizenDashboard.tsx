import React, { useState } from 'react';
import { Plus, AlertCircle, Clock, CheckCircle, Eye } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { StatusBadge } from '../common/StatusBadge';
import { ReportIssueForm } from './ReportIssueForm';
import { Issue } from '../../types';

export const CitizenDashboard: React.FC = () => {
  const { user } = useAuth();
  const { issues, getIssuesByUser } = useData();
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const userIssues = user ? getIssuesByUser(user.id) : [];
  const allIssues = issues;

  const getStatusIcon = (status: Issue['status']) => {
    switch (status) {
      case 'reported':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      case 'under-review':
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const IssueCard = ({ issue, showActions = false }: { issue: Issue; showActions?: boolean }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3 flex-1">
          {getStatusIcon(issue.status)}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{issue.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>{formatDate(issue.createdAt)}</span>
              <span>•</span>
              <span>{issue.location.address || 'Location not specified'}</span>
            </div>
          </div>
        </div>
        {showActions && (
          <button
            onClick={() => setSelectedIssue(issue)}
            className="ml-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Eye className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="flex items-center justify-between">
        <StatusBadge status={issue.status} priority={issue.priority} size="sm" />
        <span className="text-xs text-gray-500 capitalize">{issue.category.replace('-', ' ')}</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg p-6 text-white mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name}!</h1>
        <p className="text-emerald-100 mb-4">
          Report infrastructure issues in your community and track their progress.
        </p>
        <button
          onClick={() => setShowReportForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-medium"
        >
          <Plus className="h-4 w-4" />
          <span>Report New Issue</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">My Reports</p>
              <p className="text-2xl font-bold text-gray-900">{userIssues.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {userIssues.filter(i => i.status === 'in-progress' || i.status === 'under-review').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">
                {userIssues.filter(i => i.status === 'resolved').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Eye className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Community Issues</p>
              <p className="text-2xl font-bold text-gray-900">{allIssues.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* My Issues Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">My Reported Issues</h2>
        {userIssues.length > 0 ? (
          <div className="space-y-4">
            {userIssues.map(issue => (
              <IssueCard key={issue.id} issue={issue} showActions />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No issues reported yet</h3>
            <p className="text-gray-600 mb-4">Start by reporting your first infrastructure issue.</p>
            <button
              onClick={() => setShowReportForm(true)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Report First Issue
            </button>
          </div>
        )}
      </div>

      {/* Community Issues Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Community Issues</h2>
        <div className="space-y-4">
          {allIssues.slice(0, 5).map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>

      {/* Report Issue Modal */}
      {showReportForm && (
        <ReportIssueForm onClose={() => setShowReportForm(false)} />
      )}

      {/* Issue Detail Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Issue Details</h2>
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <IssueCard issue={selectedIssue} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};