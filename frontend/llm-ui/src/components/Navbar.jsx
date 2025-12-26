import React from 'react';
import { Activity } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-slate-800/50 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-linear-to-r from-blue-500 to-purple-600 p-2 rounded-lg shadow-lg shadow-blue-500/50">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AI Partner Catalyst</h1>
              <p className="text-xs text-slate-400">LLM Observability Platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors">
              Documentation
            </button>
            <button className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors">
              Analytics
            </button>
            <button className="px-4 py-2 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;