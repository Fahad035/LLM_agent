import React from 'react';
import MetricCard from './MetricCard';
import { Database, Clock, CheckCircle, DollarSign } from 'lucide-react';

const MetricsBar = ({ metrics }) => {
  const metricsData = [
    {
      icon: Database,
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/50',
      title: 'Total Requests',
      value: metrics.totalRequests,
      unit: '',
      trend: 'up'
    },
    {
      icon: Clock,
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/50',
      title: 'Avg Latency',
      value: metrics.avgLatency,
      unit: 'ms',
      trend: 'stable'
    },
    {
      icon: CheckCircle,
      iconColor: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/50',
      title: 'Success Rate',
      value: metrics.successRate.toFixed(1),
      unit: '%',
      trend: 'up'
    },
    {
      icon: DollarSign,
      iconColor: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/50',
      title: 'Total Cost',
      value: metrics.totalCost,
      unit: 'USD',
      prefix: '$',
      trend: 'up'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricsData.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default MetricsBar;