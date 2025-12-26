import React from 'react';
import StatusBadge from './StatusBadge';
import { Clock, Coins, Hash, Cpu } from 'lucide-react';

const ResponseCard = ({ response }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all hover:shadow-xl">
      {/* Header with Status Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-wrap">
          <StatusBadge status={response.status} />
          <span className="text-slate-400 text-sm flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{response.timestamp.toLocaleTimeString()}</span>
          </span>
          <span className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Cpu className="w-3 h-3" />
            <span>{response.model}</span>
          </span>
        </div>
      </div>

      {/* Prompt Section */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
          <p className="text-white font-semibold text-sm">Prompt</p>
        </div>
        <p className="text-slate-300 bg-slate-900/50 rounded-lg p-3 text-sm border border-slate-700">
          {response.prompt}
        </p>
      </div>

      {/* Response Section */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
          <p className="text-white font-semibold text-sm">Response</p>
        </div>
        <p className="text-slate-300 bg-slate-900/50 rounded-lg p-3 whitespace-pre-wrap text-sm border border-slate-700">
          {response.response}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-700">
        <div className="bg-slate-900/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Clock className="w-4 h-4 text-purple-400" />
            <p className="text-slate-400 text-xs">Latency</p>
          </div>
          <p className="text-white font-semibold">{response.latency}ms</p>
        </div>
        <div className="bg-slate-900/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Hash className="w-4 h-4 text-blue-400" />
            <p className="text-slate-400 text-xs">Tokens</p>
          </div>
          <p className="text-white font-semibold">{response.tokens}</p>
        </div>
        <div className="bg-slate-900/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Coins className="w-4 h-4 text-yellow-400" />
            <p className="text-slate-400 text-xs">Cost</p>
          </div>
          <p className="text-white font-semibold">${response.cost}</p>
        </div>
        <div className="bg-slate-900/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Hash className="w-4 h-4 text-green-400" />
            <p className="text-slate-400 text-xs">Request ID</p>
          </div>
          <p className="text-white font-semibold">#{response.id}</p>
        </div>
      </div>
    </div>
  );
};

export default ResponseCard;