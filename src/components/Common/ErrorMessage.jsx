import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="glass-card p-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Error</h3>
          <p className="text-slate-400 text-sm">{message}</p>
        </div>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="glass-button px-4 py-2 rounded-lg text-sm font-medium"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
