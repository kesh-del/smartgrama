import React, { useState } from 'react';
import { Users, Wrench, Clock, CheckCircle, MapPin, Calendar } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { StatusBadge } from '../common/StatusBadge';
import { Issue } from '../../types';

export const VolunteerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { issues, getAssignedIssues, updateIssueStatus } = useData();
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const assignedIssues = user ? getAssignedIssues(user.id) : [];
  const availableIssues = issues.filter(issue => 
    issue.status === 'reported' && !issue.assignedTo
  );

  const handleClaimIssue = (issueId: string) => {
    if (user) {
      updateIssueStatus(issueId, 'under-review', user.id);
    }
  };

  const handleUpdateStatus = (issueId: string, newStatus: Issue['status']) => {
    updateIssueStatus(issueId, newStatus, user?.id);
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
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">{issue.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{issue.description}</p>
          
          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{issue.location.address || 'Location not specified'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(issue.createdAt)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <StatusBadge status={issue.status} priority={issue.priority} size="sm" />
            <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full">
              {issue.category.replace('-', ' ')}
            </span>
          </div>
        </div>
      </div>
      
      {showActions && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {issue.status === 'reported' && !issue.assignedTo && (
            <button
              onClick={() => handleClaimIssue(issue.id)}
              className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Claim Issue
            </button>
          )}
          
          {issue.assignedTo === user?.id && issue.status !== 'resolved' && (
            <div className="flex space-x-2">
              {issue.status === 'under-review' && (
                <button
                  onClick={() => handleUpdateStatus(issue.id, 'in-progress')}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Start Work
                </button>
              )}
              {issue.status === 'in-progress' && (
                <button
                  onClick={() => handleUpdateStatus(issue.id, 'resolved')}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Mark Resolved
                </button>
              )}
              <button
                onClick={() => setSelectedIssue(issue)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                View Details
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name}!</h1>
        <p className="text-blue-100 mb-4">
          Help solve infrastructure issues in rural communities with your expertise.
        </p>
        <div className="flex flex-wrap gap-2">
          {user?.skills?.map(skill => (
            <span key={skill} className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Wrench className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">My Issues</p>
              <p className="text-2xl font-bold text-gray-900">{assignedIssues.length}</p>
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
                {assignedIssues.filter(i => i.status === 'in-progress' || i.status === 'under-review').length}
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
                {assignedIssues.filter(i => i.status === 'resolved').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-900">{availableIssues.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* My Assigned Issues */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">My Assigned Issues</h2>
        {assignedIssues.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {assignedIssues.map(issue => (
              <IssueCard key={issue.id} issue={issue} showActions />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No assigned issues</h3>
            <p className="text-gray-600">Browse available issues below to start helping your community.</p>
          </div>
        )}
      </div>

      {/* Available Issues */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Available Issues to Claim</h2>
        {availableIssues.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availableIssues.map(issue => (
              <IssueCard key={issue.id} issue={issue} showActions />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">All issues are being handled</h3>
            <p className="text-gray-600">Great work! All reported issues have been claimed by volunteers.</p>
          </div>
        )}
      </div>

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
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{selectedIssue.title}</h3>
                  <p className="text-gray-600 mb-4">{selectedIssue.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Category</p>
                      <p className="text-sm text-gray-600 capitalize">{selectedIssue.category.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Reported</p>
                      <p className="text-sm text-gray-600">{formatDate(selectedIssue.createdAt)}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Location</p>
                    <p className="text-sm text-gray-600">{selectedIssue.location.address || 'Location not specified'}</p>
                  </div>
                  
                  <StatusBadge status={selectedIssue.status} priority={selectedIssue.priority} />
                </div>

                {selectedIssue.assignedTo === user?.id && (
                  <div className="flex space-x-3 pt-4 border-t border-gray-200">
                    {selectedIssue.status === 'under-review' && (
                      <button
                        onClick={() => {
                          handleUpdateStatus(selectedIssue.id, 'in-progress');
                          setSelectedIssue(null);
                        }}
                        className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                      >
                        Start Work
                      </button>
                    )}
                    {selectedIssue.status === 'in-progress' && (
                      <button
                        onClick={() => {
                          handleUpdateStatus(selectedIssue.id, 'resolved');
                          setSelectedIssue(null);
                        }}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        Mark Resolved
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};