import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { BarChart3, Info } from 'lucide-react';
import { FeatureImportance as FeatureData } from '../types/stock';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { AnimatedCard } from './AnimatedCard';
import { AnimatedProgress } from './AnimatedProgress';

interface FeatureImportanceProps {
  features: FeatureData[];
}

export function FeatureImportance({ features }: FeatureImportanceProps) {
  const maxImportance = Math.max(...features.map(f => f.importance));
  
  return (
    <AnimatedCard variant="glass">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Feature Importance Analysis</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Machine learning model feature importance scores showing which factors most influence price predictions.
          </p>
          
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="space-y-2 stagger-animation" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{feature.feature}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{feature.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <span className="text-sm font-bold text-primary">
                    {(feature.importance * 100).toFixed(1)}%
                  </span>
                </div>
                
                <div className="relative">
                  <AnimatedProgress 
                    value={(feature.importance / maxImportance) * 100} 
                    className="h-3"
                    delay={index * 100}
                  />
                  <div 
                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(feature.importance / maxImportance) * 100}%`,
                      background: `linear-gradient(90deg, 
                        hsl(var(--chart-primary)) 0%, 
                        hsl(var(--chart-secondary)) 50%, 
                        hsl(var(--chart-tertiary)) 100%)`
                    }}
                  />
                </div>
                
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">Understanding Feature Importance</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>• Higher percentages indicate stronger influence on price predictions</p>
              <p>• Features are ranked based on their contribution to model accuracy</p>
              <p>• These scores help explain which market factors drive price movements</p>
            </div>
          </div>
        </div>
      </CardContent>
    </AnimatedCard>
  );
}