import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { AnimatedCard } from './AnimatedCard';
import { AnimatedCurrency, AnimatedPercentage } from './AnimatedNumber';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changePercent?: number;
  subtitle?: string;
  badge?: string;
  variant?: 'default' | 'success' | 'danger' | 'warning';
  delay?: number;
}

export function MetricsCard({
  title,
  value,
  change,
  changePercent,
  subtitle,
  badge,
  variant = 'default',
  delay = 0,
}: MetricsCardProps) {
  const getChangeColor = (change: number) => {
    if (change > 0) return 'price-up';
    if (change < 0) return 'price-down';
    return 'price-neutral';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4" />;
    if (change < 0) return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'border-financial-success/20 bg-financial-success/5';
      case 'danger':
        return 'border-financial-danger/20 bg-financial-danger/5';
      case 'warning':
        return 'border-financial-warning/20 bg-financial-warning/5';
      default:
        return '';
    }
  };

  return (
    <AnimatedCard 
      variant="hover-glow" 
      delay={delay}
      className={`transition-all duration-200 hover:shadow-lg ${getVariantStyles()}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {badge && (
          <Badge variant="secondary" className="text-xs animate-bounce-in">
            {badge}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">
              {typeof value === 'number' 
                ? <AnimatedCurrency value={value} />
                : <span className="animate-fade-in">{value}</span>
              }
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1 animate-slide-up">
                {subtitle}
              </p>
            )}
          </div>
          {change !== undefined && (
            <div className={`flex items-center space-x-1 ${getChangeColor(change)} animate-slide-down`}>
              <div className="transition-transform duration-200 hover:scale-110">
                {getChangeIcon(change)}
              </div>
              <div className="text-sm font-medium">
                <div className="animate-count-up">
                  {change > 0 ? '+' : ''}{change.toFixed(2)}
                </div>
                {changePercent !== undefined && (
                  <div className="text-xs">
                    <AnimatedPercentage value={changePercent} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </AnimatedCard>
  );
}