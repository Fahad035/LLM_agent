import React from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    success: {
      icon: CheckCircle,
      text: 'Success',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400',
      borderColor: 'border-green-500/20'
    },
    error: {
      icon: XCircle,
      text: 'Error',
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-400',
      borderColor: 'border-red-500/20'
    },
    warning: {
      icon: AlertTriangle,
      text: 'Warning',
      bgColor: 'bg-yellow-500/10',
      textColor: 'text-yellow-400',
      borderColor: 'border-yellow-500/20'
    }
  };

  const config = statusConfig[status] || statusConfig.success;
  const Icon = config.icon;

  return (
    <span className={`flex items-center space-x-2 ${config.bgColor} ${config.textColor} px-3 py-1 rounded-full text-sm font-medium border ${config.borderColor}`}>
      <Icon className="w-4 h-4" />
      <span>{config.text}</span>
    </span>
  );
};

export default StatusBadge;