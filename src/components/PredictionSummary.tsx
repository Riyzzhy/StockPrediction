import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { TrendingUp, TrendingDown, Target, Brain } from 'lucide-react';
import { PredictionData } from '../types/stock';
import { AnimatedCard } from './AnimatedCard';
import { AnimatedCurrency, AnimatedPercentage } from './AnimatedNumber';
import { AnimatedProgress } from './AnimatedProgress';

interface PredictionSummaryProps {
  predictions: PredictionData[];
  currentPrice: number;
}

export function PredictionSummary({ predictions, currentPrice }: PredictionSummaryProps) {
  // Calculate summary statistics
  const avgPrediction = predictions.reduce((sum, p) => sum + p.predictedPrice, 0) / predictions.length;
  const avgConfidence = predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length;
  const priceChange = avgPrediction - currentPrice;
  const priceChangePercent = (priceChange / currentPrice) * 100;
  
  // Get model predictions breakdown
  const modelBreakdown = predictions.reduce((acc, pred) => {
    acc[pred.model] = acc[pred.model] || [];
    acc[pred.model].push(pred.predictedPrice);
    return acc;
  }, {} as Record<string, number[]>);

  const modelAverages = Object.entries(modelBreakdown).map(([model, prices]) => ({
    model,
    avgPrice: prices.reduce((sum, p) => sum + p, 0) / prices.length,
    change: (prices.reduce((sum, p) => sum + p, 0) / prices.length) - currentPrice,
  }));

  // Calculate trend direction
  const shortTermPredictions = predictions.slice(0, 7); // Next 7 days
  const longTermPredictions = predictions.slice(7, 30); // Days 8-30
  
  const shortTermAvg = shortTermPredictions.reduce((sum, p) => sum + p.predictedPrice, 0) / shortTermPredictions.length;
  const longTermAvg = longTermPredictions.reduce((sum, p) => sum + p.predictedPrice, 0) / longTermPredictions.length;

  const getSignalColor = (change: number) => {
    if (change > 0) return 'text-financial-success';
    if (change < 0) return 'text-financial-danger';
    return 'text-muted-foreground';
  };

  const getSignalIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4" />;
    if (change < 0) return <TrendingDown className="h-4 w-4" />;
    return <Target className="h-4 w-4" />;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.8) return 'text-financial-success';
    if (confidence > 0.6) return 'text-financial-warning';
    return 'text-financial-danger';
  };

  return (
    <div className="space-y-6">
      {/* Overall Prediction Summary */}
      <AnimatedCard variant="glass" delay={100}>
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">30-Day Prediction Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Average Predicted Price</span>
              <div className="text-2xl font-bold">
                <AnimatedCurrency value={avgPrediction} />
              </div>
              <div className={`flex items-center space-x-1 ${getSignalColor(priceChange)} animate-slide-down`}>
                {getSignalIcon(priceChange)}
                <span className="text-sm font-medium">
                  <AnimatedPercentage value={priceChangePercent} />
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Average Confidence</span>
              <div className={`text-2xl font-bold ${getConfidenceColor(avgConfidence)} animate-count-up`}>
                {(avgConfidence * 100).toFixed(1)}%
              </div>
              <AnimatedProgress 
                value={avgConfidence * 100} 
                className="h-2" 
                delay={200}
                color={avgConfidence > 0.8 ? 'success' : avgConfidence > 0.6 ? 'warning' : 'danger'}
              />
            </div>
            
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Prediction Range</span>
              <div className="text-sm">
                <div className="flex justify-between">
                  <span>Low: ${Math.min(...predictions.map(p => p.lowerBound)).toFixed(2)}</span>
                  <span>High: ${Math.max(...predictions.map(p => p.upperBound)).toFixed(2)}</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Based on confidence intervals
              </div>
            </div>
          </div>
        </CardContent>
      </AnimatedCard>

      {/* Model Breakdown */}
      <AnimatedCard variant="glass" delay={200}>
        <CardHeader>
          <CardTitle className="text-lg">Model Predictions Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {modelAverages.map((model, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover-glow stagger-animation"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="font-mono">
                    {model.model}
                  </Badge>
                  <div>
                    <div className="font-semibold">
                      <AnimatedCurrency value={model.avgPrice} />
                    </div>
                    <div className={`text-sm ${getSignalColor(model.change)}`}>
                      {model.change > 0 ? '+' : ''}${model.change.toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className={`flex items-center space-x-1 ${getSignalColor(model.change)}`}>
                  {getSignalIcon(model.change)}
                  <span className="text-sm font-medium">
                    {((model.change / currentPrice) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </AnimatedCard>

      {/* Short vs Long Term Outlook */}
      <AnimatedCard variant="glass" delay={300}>
        <CardHeader>
          <CardTitle className="text-lg">Term Outlook</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 stagger-animation" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Short Term (7 days)</span>
                <Badge variant="outline" className="text-xs animate-bounce-in">
                  Next Week
                </Badge>
              </div>
              <div className="text-xl font-bold">
                <AnimatedCurrency value={shortTermAvg} />
              </div>
              <div className={`flex items-center space-x-1 ${getSignalColor(shortTermAvg - currentPrice)}`}>
                {getSignalIcon(shortTermAvg - currentPrice)}
                <span className="text-sm">
                  {((shortTermAvg - currentPrice) / currentPrice * 100).toFixed(2)}% change
                </span>
              </div>
            </div>
            
            <div className="space-y-3 stagger-animation" style={{ animationDelay: '500ms' }}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Long Term (30 days)</span>
                <Badge variant="outline" className="text-xs animate-bounce-in">
                  Next Month
                </Badge>
              </div>
              <div className="text-xl font-bold">
                <AnimatedCurrency value={longTermAvg} />
              </div>
              <div className={`flex items-center space-x-1 ${getSignalColor(longTermAvg - currentPrice)}`}>
                {getSignalIcon(longTermAvg - currentPrice)}
                <span className="text-sm">
                  {((longTermAvg - currentPrice) / currentPrice * 100).toFixed(2)}% change
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </AnimatedCard>
    </div>
  );
}