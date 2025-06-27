import React, { useState } from 'react';
import { BookOpen, Download, Eye, Search, Filter, Globe, Heart } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export const EducationHub: React.FC = () => {
  const { educationalContent } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const categories = ['all', 'Water Management', 'Energy', 'Agriculture', 'Healthcare', 'Construction'];
  const languages = ['all', 'english', 'hindi'];

  const filteredContent = educationalContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || content.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || content.language === selectedLanguage;
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const ContentCard = ({ content }: { content: typeof educationalContent[0] }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3 flex-1">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <BookOpen className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">{content.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{content.content}</p>
            
            <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
              <span className="flex items-center space-x-1">
                <Globe className="h-3 w-3" />
                <span className="capitalize">{content.language}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>{content.views} views</span>
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {content.category}
              </span>
              {content.downloadable && (
                <button className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const featuredSolutions = [
    {
      title: 'DIY Water Filtration System',
      description: 'Build a low-cost water filter using locally available materials.',
      cost: '₹300-500',
      difficulty: 'Easy',
      time: '2-3 hours',
    },
    {
      title: 'Solar Phone Charger',
      description: 'Create a simple solar charging station for mobile phones.',
      cost: '₹800-1200',
      difficulty: 'Medium',
      time: '4-5 hours',
    },
    {
      title: 'Rainwater Harvesting',
      description: 'Set up a basic rainwater collection and storage system.',
      cost: '₹1500-2500',
      difficulty: 'Medium',
      time: '1 day',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <BookOpen className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Education Hub</h1>
        </div>
        <p className="text-blue-100 mb-4">
          Learn sustainable solutions and best practices for rural infrastructure development.
        </p>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <Heart className="h-4 w-4" />
            <span>Community Driven</span>
          </div>
          <div className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Offline Ready</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>Multi-Language</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search educational content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {languages.map(language => (
                <option key={language} value={language}>
                  {language === 'all' ? 'All Languages' : language.charAt(0).toUpperCase() + language.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Solutions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Featured DIY Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredSolutions.map((solution, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{solution.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{solution.description}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-4 text-xs">
                <div>
                  <p className="font-medium text-gray-700">Cost</p>
                  <p className="text-emerald-600">{solution.cost}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Difficulty</p>
                  <p className="text-blue-600">{solution.difficulty}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Time</p>
                  <p className="text-purple-600">{solution.time}</p>
                </div>
              </div>
              
              <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                View Guide
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Content */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Educational Resources</h2>
        {filteredContent.length > 0 ? (
          <div className="space-y-4">
            {filteredContent.map(content => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};