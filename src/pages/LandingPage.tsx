import React, { useState } from 'react';
import { Users, UserCheck, ArrowRight } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';

export const LandingPage: React.FC = () => {
  const [selectedUserType, setSelectedUserType] = useState<'citizen' | 'volunteer' | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  if (selectedUserType) {
    return (
      <AuthLayout
        title={authMode === 'login' ? 'Sign In' : 'Create Account'}
        subtitle={`${authMode === 'login' ? 'Welcome back' : 'Join'} as ${selectedUserType === 'citizen' ? 'a Citizen' : 'a Volunteer'}`}
      >
        <div className="mb-6">
          <button
            onClick={() => setSelectedUserType(null)}
            className="text-sm text-emerald-600 hover:text-emerald-500 font-medium"
          >
            ← Back to user selection
          </button>
        </div>
        
        {authMode === 'login' ? (
          <LoginForm
            userType={selectedUserType}
            onSwitchToRegister={() => setAuthMode('register')}
          />
        ) : (
          <RegisterForm
            userType={selectedUserType}
            onSwitchToLogin={() => setAuthMode('login')}
          />
        )}
      </AuthLayout>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Panel - Branding */}
        <div className="lg:w-1/2 bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center p-8 lg:p-12">
          <div className="max-w-md text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
              <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">GramaConnect</h1>
            </div>
            
            <h2 className="text-xl font-semibold text-emerald-100 mb-4">
              Transforming Rural Infrastructure
            </h2>
            
            <p className="text-emerald-200 mb-8 leading-relaxed">
              A comprehensive platform connecting rural communities with government bodies, NGOs, and volunteers to address infrastructure challenges and build sustainable solutions.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-emerald-100">
                <div className="h-2 w-2 bg-emerald-300 rounded-full"></div>
                <span className="text-sm">Report infrastructure issues with GPS tracking</span>
              </div>
              <div className="flex items-center space-x-3 text-emerald-100">
                <div className="h-2 w-2 bg-emerald-300 rounded-full"></div>
                <span className="text-sm">Connect with skilled volunteers and NGOs</span>
              </div>
              <div className="flex items-center space-x-3 text-emerald-100">
                <div className="h-2 w-2 bg-emerald-300 rounded-full"></div>
                <span className="text-sm">Access educational content and DIY solutions</span>
              </div>
              <div className="flex items-center space-x-3 text-emerald-100">
                <div className="h-2 w-2 bg-emerald-300 rounded-full"></div>
                <span className="text-sm">Track progress and community impact</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - User Type Selection */}
        <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Role</h2>
              <p className="text-gray-600">Select how you'd like to participate in building better rural infrastructure</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setSelectedUserType('citizen');
                  setAuthMode('login');
                }}
                className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all group text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">I'm a Citizen</h3>
                    <p className="text-sm text-gray-600 mb-3">Report infrastructure issues in your community and track their resolution progress.</p>
                    <div className="flex items-center space-x-1 text-sm text-emerald-600 font-medium">
                      <span>Continue as Citizen</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setSelectedUserType('volunteer');
                  setAuthMode('login');
                }}
                className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <UserCheck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">I'm a Volunteer</h3>
                    <p className="text-sm text-gray-600 mb-3">Use your skills and expertise to help solve infrastructure challenges in rural communities.</p>
                    <div className="flex items-center space-x-1 text-sm text-blue-600 font-medium">
                      <span>Continue as Volunteer</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Why GramaConnect?</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Community-driven infrastructure development</li>
                <li>• Real-time issue tracking and resolution</li>
                <li>• Connecting local expertise with rural needs</li>
                <li>• Building sustainable, long-term solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};