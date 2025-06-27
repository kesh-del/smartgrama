import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Issue, Solution, EducationalContent } from '../types';

interface DataContextType {
  issues: Issue[];
  solutions: Solution[];
  educationalContent: EducationalContent[];
  addIssue: (issue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateIssueStatus: (issueId: string, status: Issue['status'], assignedTo?: string) => void;
  addSolution: (solution: Omit<Solution, 'id' | 'createdAt' | 'votes'>) => void;
  getIssuesByUser: (userId: string) => Issue[];
  getAssignedIssues: (volunteerId: string) => Issue[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Mock data
const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Main Road Pothole Emergency',
    description: 'Large potholes on the main village road causing accidents. Motorcycles are getting damaged daily.',
    category: 'roads',
    status: 'reported',
    priority: 'high',
    reportedBy: '1',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'Main Road, Rampur Village, Uttar Pradesh'
    },
    photos: ['https://images.pexels.com/photos/3634741/pexels-photo-3634741.jpeg'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Water Supply Contamination',
    description: 'Village well water has become muddy and unsafe for drinking. Multiple families affected.',
    category: 'water',
    status: 'under-review',
    priority: 'critical',
    reportedBy: '1',
    assignedTo: '2',
    location: {
      lat: 28.6129,
      lng: 77.2080,
      address: 'Central Well, Rampur Village, Uttar Pradesh'
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12'),
  }
];

const mockSolutions: Solution[] = [
  {
    id: '1',
    issueId: '2',
    title: 'DIY Water Filtration System',
    description: 'A low-cost water filtration system using sand, gravel, and cloth filters.',
    cost: '₹500-800',
    difficulty: 'medium',
    materials: ['Sand', 'Gravel', 'Cloth filters', 'Plastic containers'],
    steps: [
      'Clean plastic containers thoroughly',
      'Layer gravel at the bottom',
      'Add sand layer above gravel',
      'Place cloth filter on top',
      'Pour contaminated water slowly'
    ],
    providedBy: '2',
    votes: 12,
    createdAt: new Date('2024-01-12'),
  }
];

const mockEducationalContent: EducationalContent[] = [
  {
    id: '1',
    title: 'Water Conservation Techniques',
    category: 'Water Management',
    content: 'Learn effective methods to conserve and manage water resources in rural areas.',
    language: 'english',
    downloadable: true,
    views: 234,
  },
  {
    id: '2',
    title: 'Solar Energy for Villages',
    category: 'Energy',
    content: 'Understanding solar power solutions for rural communities.',
    language: 'hindi',
    downloadable: true,
    views: 187,
  }
];

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [solutions, setSolutions] = useState<Solution[]>(mockSolutions);
  const [educationalContent] = useState<EducationalContent[]>(mockEducationalContent);

  const addIssue = (issueData: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newIssue: Issue = {
      ...issueData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setIssues(prev => [newIssue, ...prev]);
  };

  const updateIssueStatus = (issueId: string, status: Issue['status'], assignedTo?: string) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId 
        ? { 
            ...issue, 
            status, 
            assignedTo, 
            updatedAt: new Date(),
            resolvedAt: status === 'resolved' ? new Date() : undefined
          }
        : issue
    ));
  };

  const addSolution = (solutionData: Omit<Solution, 'id' | 'createdAt' | 'votes'>) => {
    const newSolution: Solution = {
      ...solutionData,
      id: Date.now().toString(),
      votes: 0,
      createdAt: new Date(),
    };
    setSolutions(prev => [newSolution, ...prev]);
  };

  const getIssuesByUser = (userId: string) => {
    return issues.filter(issue => issue.reportedBy === userId);
  };

  const getAssignedIssues = (volunteerId: string) => {
    return issues.filter(issue => issue.assignedTo === volunteerId);
  };

  return (
    <DataContext.Provider value={{
      issues,
      solutions,
      educationalContent,
      addIssue,
      updateIssueStatus,
      addSolution,
      getIssuesByUser,
      getAssignedIssues,
    }}>
      {children}
    </DataContext.Provider>
  );
};