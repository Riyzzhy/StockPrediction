import { useEffect, useState } from 'react';
import { Progress } from './ui/progress';
import { cn } from '../lib/utils';

interface AnimatedProgressProps {
  value: number;
  className?: string;
  duration?: number;
  delay?: number;
  showValue?: boolean;
  color?: 'default' | 'success' | 'warning' | 'danger';
}

export function AnimatedProgress({
  value,
  className,
  duration = 1000,
  delay = 0,
  showValue = false,
  color = 'default'
}: AnimatedProgressProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      setCurrentValue(value);
      
      const animationTimer = setTimeout(() => {
        setIsAnimating(false);
      }, duration);

      return () => clearTimeout(animationTimer);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay, duration]);

  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'progress-success';
      case 'warning':
        return 'progress-warning';
      case 'danger':
        return 'progress-danger';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Progress 
          value={currentValue}
          className={cn(
            'transition-all duration-1000 ease-out',
            getColorClasses(),
            isAnimating && 'animate-progress-fill',
            className
          )}
        />
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-foreground">
              {Math.round(currentValue)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function AnimatedProgressRing({
  value,
  size = 120,
  strokeWidth = 8,
  className,
  color = 'default'
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: 'default' | 'success' | 'warning' | 'danger';
}) {
  const [currentValue, setCurrentValue] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (currentValue / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentValue(value);
    }, 100);

    return () => clearTimeout(timer);
  }, [value]);

  const getStrokeColor = () => {
    switch (color) {
      case 'success':
        return 'hsl(var(--financial-success))';
      case 'warning':
        return 'hsl(var(--financial-warning))';
      case 'danger':
        return 'hsl(var(--financial-danger))';
      default:
        return 'hsl(var(--primary))';
    }
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getStrokeColor()}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: 'drop-shadow(0 0 6px hsl(var(--primary) / 0.3))'
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold">
          {Math.round(currentValue)}%
        </span>
      </div>
    </div>
  );
}