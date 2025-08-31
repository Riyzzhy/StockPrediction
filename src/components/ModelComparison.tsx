import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Trophy, Target, TrendingUp, Zap } from 'lucide-react';
import { ModelPerformance } from '../types/stock';
import { AnimatedCard } from './AnimatedCard';
import { AnimatedProgress } from './AnimatedProgress';

interface ModelComparisonProps {
  models: ModelPerformance[];
}

export function ModelComparison({ models }: ModelComparisonProps) {
  const bestModel = models.reduce((best, current) => 
    current.accuracy > best.accuracy ? current : best
  );

  const getPerformanceColor = (accuracy: number) => {
    if (accuracy > 0.85) return 'text-financial-success';
    if (accuracy > 0.75) return 'text-financial-warning';
    return 'text-financial-danger';
  };

  const getModelIcon = (modelName: string) => {
    if (modelName.includes('LSTM')) return <Zap className="h-4 w-4" />;
    if (modelName.includes('Random')) return <Target className="h-4 w-4" />;
    if (modelName.includes('ARIMA')) return <TrendingUp className="h-4 w-4" />;
    return <Trophy className="h-4 w-4" />;
  };

  const getModelDescription = (modelName: string) => {
    if (modelName.includes('LSTM')) return 'Deep learning neural network for time series';
    if (modelName.includes('Random')) return 'Ensemble method using decision trees';
    if (modelName.includes('ARIMA')) return 'Statistical model for time series analysis';
    if (modelName.includes('XGBoost')) return 'Gradient boosting algorithm';
    return 'Machine learning model';
  };

  return (
    <AnimatedCard variant="glass">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Model Performance Comparison</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Best Model Highlight */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-chart-secondary/10 border border-primary/20 animate-bounce-in">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="font-semibold">Best Performing Model</span>
              </div>
              <Badge variant="default" className="bg-primary text-primary-foreground">
                Top Choice
              </Badge>
            </div>
            <div className="text-lg font-bold text-primary mb-1">
              {bestModel.model}
            </div>
            <div className="text-sm text-muted-foreground">
              {getModelDescription(bestModel.model)}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div>
                <span className="text-xs text-muted-foreground">Accuracy</span>
                <div className="text-sm font-bold text-financial-success">
                  {(bestModel.accuracy * 100).toFixed(1)}%
                </div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">MAE</span>
                <div className="text-sm font-bold">{bestModel.mae.toFixed(2)}</div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">RMSE</span>
                <div className="text-sm font-bold">{bestModel.rmse.toFixed(2)}</div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">R² Score</span>
                <div className="text-sm font-bold text-financial-success">
                  {bestModel.r2Score.toFixed(3)}
                </div>
              </div>
            </div>
          </div>

          {/* All Models Comparison */}
          <div className="space-y-4">
            {models.map((model, index) => (
              <div 
                key={index} 
                className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors hover-glow stagger-animation"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getModelIcon(model.model)}
                    <div>
                      <div className="font-semibold">{model.model}</div>
                      <div className="text-xs text-muted-foreground">
                        {getModelDescription(model.model)}
                      </div>
                    </div>
                  </div>
                  {model.model === bestModel.model && (
                    <Badge variant="default" className="text-xs">
                      Best
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  {/* Accuracy Progress */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Accuracy</span>
                      <span className={`font-bold ${getPerformanceColor(model.accuracy)} animate-count-up`}>
                        {(model.accuracy * 100).toFixed(1)}%
                      </span>
                    </div>
                    <AnimatedProgress 
                      value={model.accuracy * 100} 
                      className="h-2" 
                      delay={index * 100}
                      color={model.accuracy > 0.85 ? 'success' : model.accuracy > 0.75 ? 'warning' : 'danger'}
                    />
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">MAE</span>
                      <div className="font-semibold">{model.mae.toFixed(2)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">RMSE</span>
                      <div className="font-semibold">{model.rmse.toFixed(2)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">R² Score</span>
                      <div className="font-semibold">{model.r2Score.toFixed(3)}</div>
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="text-xs text-muted-foreground">
                    Last updated: {new Date(model.lastUpdated).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Metrics Explanation */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">Performance Metrics Explained</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p><strong>Accuracy:</strong> Overall correctness of predictions</p>
              <p><strong>MAE (Mean Absolute Error):</strong> Average absolute difference between predicted and actual values</p>
              <p><strong>RMSE (Root Mean Square Error):</strong> Square root of average squared differences</p>
              <p><strong>R² Score:</strong> Coefficient of determination, measures model's explanatory power</p>
            </div>
          </div>
        </div>
      </CardContent>
    </AnimatedCard>
  );
}