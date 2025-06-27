import React from 'react';
import { Home, Users, Lightbulb } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Panel - Branding */}
        <div className="lg:w-1/2 bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center p-8 lg:p-12">
          <div className="max-w-md text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
              <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Home className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">GramaConnect</h1>
            </div>
            
            <h2 className="text-xl font-semibold text-emerald-100 mb-4">
              Empowering Rural Infrastructure
            </h2>
            
            <p className="text-emerald-200 mb-8 leading-relaxed">
              Connect rural communities with government bodies, NGOs, and volunteers to address infrastructure challenges and build sustainable solutions.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-emerald-100">
                <Users className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">Community-driven problem solving</span>
              </div>
              <div className="flex items-center space-x-3 text-emerald-100">
                <Lightbulb className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">Innovative rural development solutions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
              <p className="text-gray-600">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};