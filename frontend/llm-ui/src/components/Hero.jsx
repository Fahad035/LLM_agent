import React from 'react';
import { BarChart3, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 mb-8 relative overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
            <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/30">
              Real-Time Monitoring
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">
            LLM Performance Dashboard
          </h2>
          <p className="text-blue-100 text-lg">
            Track performance, costs, and quality metrics for your AI models in real-time
          </p>
        </div>
        <div className="hidden md:block">
          <div className="relative">
            <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full"></div>
            <BarChart3 className="w-32 h-32 text-white/30 relative z-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
