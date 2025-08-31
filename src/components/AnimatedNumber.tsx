import { useAnimatedNumber } from '../hooks/useAnimatedNumber';
import { cn } from '../lib/utils';

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  formatFn?: (value: number) => string;
}

export function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  decimals = 2,
  duration = 1000,
  className,
  formatFn
}: AnimatedNumberProps) {
  const defaultFormatter = (num: number) => {
    return `${prefix}${num.toFixed(decimals)}${suffix}`;
  };

  const { value: animatedValue, isAnimating } = useAnimatedNumber(
    value,
    duration,
    formatFn || defaultFormatter
  );

  return (
    <span 
      className={cn(
        'number-animation',
        isAnimating && 'animate-count-up',
        className
      )}
    >
      {animatedValue}
    </span>
  );
}

export function AnimatedCurrency({
  value,
  duration = 1000,
  className,
  compact = false
}: {
  value: number;
  duration?: number;
  className?: string;
  compact?: boolean;
}) {
  const formatter = (num: number) => {
    if (compact && Math.abs(num) >= 1e9) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 1,
      }).format(num);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(num);
  };

  const { value: animatedValue, isAnimating } = useAnimatedNumber(
    value,
    duration,
    formatter
  );

  return (
    <span 
      className={cn(
        'number-animation font-mono',
        isAnimating && 'animate-count-up',
        className
      )}
    >
      {animatedValue}
    </span>
  );
}

export function AnimatedPercentage({
  value,
  duration = 800,
  className,
  showSign = true
}: {
  value: number;
  duration?: number;
  className?: string;
  showSign?: boolean;
}) {
  const formatter = (num: number) => {
    const sign = showSign && num > 0 ? '+' : '';
    return `${sign}${num.toFixed(2)}%`;
  };

  const { value: animatedValue, isAnimating } = useAnimatedNumber(
    value,
    duration,
    formatter
  );

  return (
    <span 
      className={cn(
        'number-animation font-medium',
        isAnimating && 'animate-count-up',
        value > 0 && 'text-financial-success',
        value < 0 && 'text-financial-danger',
        value === 0 && 'text-muted-foreground',
        className
      )}
    >
      {animatedValue}
    </span>
  );
}