import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, Brain, BarChart3, Clock } from 'lucide-react';
import { AnimatedCard } from './AnimatedCard';

export function Header() {
  const lastUpdated = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <AnimatedCard variant="glass" className="mb-8 particle-background">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 animate-pulse-glow">
                <TrendingUp className="h-6 w-6 text-primary animate-float" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-chart-secondary bg-clip-text text-transparent animate-gradient-shift">
                  Stock Prediction Analysis
                </h1>
                <p className="text-muted-foreground animate-slide-up">
                  Advanced machine learning models for financial market forecasting
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="flex items-center space-x-1 animate-bounce-in" style={{ animationDelay: '200ms' }}>
                <Brain className="h-3 w-3" />
                <span>ML Powered</span>
              </Badge>
              <Badge variant="outline" className="flex items-center space-x-1 animate-bounce-in" style={{ animationDelay: '300ms' }}>
                <BarChart3 className="h-3 w-3" />
                <span>Real-time Analysis</span>
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Clock className="h-4 w-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted/50 hover-glow stagger-animation" style={{ animationDelay: '500ms' }}>
            <div className="w-2 h-2 rounded-full bg-financial-success"></div>
            <span><strong>Historical Analysis:</strong> 365 days of market data</span>
          </div>
          <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted/50 hover-glow stagger-animation" style={{ animationDelay: '600ms' }}>
            <div className="w-2 h-2 rounded-full bg-financial-prediction animate-pulse"></div>
            <span><strong>Predictions:</strong> 30-day forecasting horizon</span>
          </div>
          <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted/50 hover-glow stagger-animation" style={{ animationDelay: '700ms' }}>
            <div className="w-2 h-2 rounded-full bg-chart-primary animate-pulse"></div>
            <span><strong>Models:</strong> LSTM, ARIMA, RF, XGBoost</span>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
}