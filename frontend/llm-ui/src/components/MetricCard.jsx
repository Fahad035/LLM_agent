import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const MetricCard = ({ 
  icon, 
  iconColor, 
  bgColor, 
  borderColor,
  title, 
  value, 
  unit, 
  prefix = '',
  trend = 'stable'
}) => {
  const Icon = icon;
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-slate-400';

  return (
    <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:${borderColor} transition-all transform hover:scale-105 hover:shadow-xl`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`${bgColor} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <TrendIcon className={`w-5 h-5 ${trendColor}`} />
      </div>
      <p className="text-slate-400 text-sm mb-2">{title}</p>
      <div className="flex items-baseline space-x-2">
        <p className="text-3xl font-bold text-white">
          {prefix}{value}
        </p>
        {unit && <span className="text-slate-500 text-sm">{unit}</span>}
      </div>
    </div>
  );
};

export default MetricCard;