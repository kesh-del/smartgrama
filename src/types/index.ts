export interface User {
  id: string;
  name: string;
  phone: string;
  userType: 'citizen' | 'volunteer';
  village?: string;
  qualifications?: string;
  aadharNumber?: string;
  skills?: string[];
  createdAt: Date;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: 'electricity' | 'roads' | 'water' | 'sanitation' | 'healthcare' | 'education' | 'other';
  status: 'reported' | 'under-review' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  reportedBy: string;
  assignedTo?: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  photos?: string[];
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

export interface Solution {
  id: string;
  issueId: string;
  title: string;
  description: string;
  cost: string;
  difficulty: 'easy' | 'medium' | 'hard';
  materials: string[];
  steps: string[];
  providedBy: string;
  votes: number;
  createdAt: Date;
}

export interface EducationalContent {
  id: string;
  title: string;
  category: string;
  content: string;
  language: 'hindi' | 'english';
  downloadable: boolean;
  views: number;
}