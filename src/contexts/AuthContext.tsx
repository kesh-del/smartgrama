import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (phone: string, password: string, userType: 'citizen' | 'volunteer') => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('gramaconnect_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('gramaconnect_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (phone: string, password: string, userType: 'citizen' | 'volunteer'): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo user for testing
    if (phone === '9876543210' && password === 'demo123') {
      const demoUser: User = {
        id: '1',
        name: userType === 'citizen' ? 'Rajesh Kumar' : 'Dr. Priya Sharma',
        phone,
        userType,
        village: userType === 'citizen' ? 'Rampur' : undefined,
        qualifications: userType === 'volunteer' ? 'M.Tech Civil Engineering' : undefined,
        aadharNumber: userType === 'volunteer' ? '1234-5678-9012' : undefined,
        skills: userType === 'volunteer' ? ['Infrastructure Planning', 'Water Management'] : undefined,
        createdAt: new Date(),
      };
      
      setUser(demoUser);
      localStorage.setItem('gramaconnect_user', JSON.stringify(demoUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      phone: userData.phone || '',
      userType: userData.userType || 'citizen',
      village: userData.village,
      qualifications: userData.qualifications,
      aadharNumber: userData.aadharNumber,
      skills: userData.skills,
      createdAt: new Date(),
    };
    
    setUser(newUser);
    localStorage.setItem('gramaconnect_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gramaconnect_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};