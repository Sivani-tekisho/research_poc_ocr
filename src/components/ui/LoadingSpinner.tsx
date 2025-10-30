

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  progress?: number; // 0-100 for progress bar
  showProgress?: boolean;
}

export function LoadingSpinner({ 
  size = 'md', 
  message, 
  progress, 
  showProgress = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Spinner */}
      <div className="relative">
        <div className={`animate-spin rounded-full border-2 border-slate-600 border-t-cyan-400 ${sizeClasses[size]}`}></div>
        
        {/* Progress ring overlay */}
        {showProgress && progress !== undefined && (
          <svg 
            className={`absolute inset-0 ${sizeClasses[size]} -rotate-90`}
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-slate-600"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 10}`}
              strokeDashoffset={`${2 * Math.PI * 10 * (1 - progress / 100)}`}
              className="text-purple-400 transition-all duration-300"
            />
          </svg>
        )}
      </div>

      {/* Message */}
      {message && (
        <p className="mt-3 text-sm text-slate-400 text-center animate-pulse">
          {message}
        </p>
      )}

      {/* Progress percentage */}
      {showProgress && progress !== undefined && (
        <p className="mt-2 text-xs font-mono text-cyan-400">
          {Math.round(progress)}%
        </p>
      )}

      {/* Progress bar */}
      {showProgress && progress !== undefined && (
        <div className="w-32 h-1 bg-slate-700 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
