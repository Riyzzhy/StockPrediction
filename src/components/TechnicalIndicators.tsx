import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { TechnicalIndicators as TechIndicators } from '../types/stock';
import { AnimatedCard } from './AnimatedCard';
import { AnimatedProgress, AnimatedProgressRing } from './AnimatedProgress';
import { AnimatedCurrency } from './AnimatedNumber';

interface TechnicalIndicatorsProps {
  indicators: TechIndicators;
  currentPrice: number;
}

export function TechnicalIndicators({ indicators, currentPrice }: TechnicalIndicatorsProps) {
  const getRSISignal = (rsi: number) => {
    if (rsi > 70) return { signal: 'Overbought', color: 'bg-financial-danger', variant: 'destructive' as const };
    if (rsi < 30) return { signal: 'Oversold', color: 'bg-financial-success', variant: 'default' as const };
    return { signal: 'Neutral', color: 'bg-financial-neutral', variant: 'secondary' as const };
  };

  const getMACDSignal = (macd: number, signal: number) => {
    const diff = macd - signal;
    if (Math.abs(diff) < 0.1) return { signal: 'Neutral', variant: 'secondary' as const };
    return diff > 0 
      ? { signal: 'Bullish', variant: 'default' as const }
      : { signal: 'Bearish', variant: 'destructive' as const };
  };

  const getBollingerPosition = (price: number, upper: number, lower: number, middle: number) => {
    const position = ((price - lower) / (upper - lower)) * 100;
    if (position > 80) return { signal: 'Near Upper Band', variant: 'destructive' as const };
    if (position < 20) return { signal: 'Near Lower Band', variant: 'default' as const };
    return { signal: 'Mid Channel', variant: 'secondary' as const };
  };

  const rsiSignal = getRSISignal(indicators.rsi);
  const macdSignal = getMACDSignal(indicators.macd, indicators.macdSignal);
  const bollingerSignal = getBollingerPosition(
    currentPrice,
    indicators.bollingerUpper,
    indicators.bollingerLower,
    indicators.bollingerMiddle
  );

  const indicatorData = [
    {
      name: 'SMA 20',
      value: indicators.sma20,
      description: '20-day Simple Moving Average',
      signal: currentPrice > indicators.sma20 ? 'Above' : 'Below',
      signalVariant: currentPrice > indicators.sma20 ? 'default' as const : 'destructive' as const,
    },
    {
      name: 'SMA 50',
      value: indicators.sma50,
      description: '50-day Simple Moving Average',
      signal: currentPrice > indicators.sma50 ? 'Above' : 'Below',
      signalVariant: currentPrice > indicators.sma50 ? 'default' as const : 'destructive' as const,
    },
    {
      name: 'EMA 12',
      value: indicators.ema12,
      description: '12-day Exponential Moving Average',
      signal: currentPrice > indicators.ema12 ? 'Above' : 'Below',
      signalVariant: currentPrice > indicators.ema12 ? 'default' as const : 'destructive' as const,
    },
    {
      name: 'EMA 26',
      value: indicators.ema26,
      description: '26-day Exponential Moving Average',
      signal: currentPrice > indicators.ema26 ? 'Above' : 'Below',
      signalVariant: currentPrice > indicators.ema26 ? 'default' as const : 'destructive' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Moving Averages */}
      <AnimatedCard variant="glass" delay={100}>
        <CardHeader>
          <CardTitle className="text-lg">Moving Averages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {indicatorData.map((indicator, index) => (
              <div key={index} className="space-y-2 stagger-animation" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{indicator.name}</span>
                  <Badge variant={indicator.signalVariant} className="text-xs">
                    {indicator.signal}
                  </Badge>
                </div>
                <div className="text-lg font-bold">
                  <AnimatedCurrency value={indicator.value} />
                </div>
                <p className="text-xs text-muted-foreground">
                  {indicator.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </AnimatedCard>

      {/* Oscillators */}
      <AnimatedCard variant="glass" delay={200}>
        <CardHeader>
          <CardTitle className="text-lg">Technical Oscillators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* RSI */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">RSI (14)</span>
              <Badge variant={rsiSignal.variant} className="text-xs">
                {rsiSignal.signal}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Oversold (30)</span>
                <span className="font-bold">{indicators.rsi.toFixed(1)}</span>
                <span>Overbought (70)</span>
              </div>
              <AnimatedProgress 
                value={indicators.rsi} 
                className="h-2" 
                delay={300}
                color={indicators.rsi > 70 ? 'danger' : indicators.rsi < 30 ? 'success' : 'default'}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Relative Strength Index - Momentum oscillator
            </p>
          </div>

          {/* MACD */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">MACD</span>
              <Badge variant={macdSignal.variant} className="text-xs">
                {macdSignal.signal}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">MACD Line:</span>
                <div className="font-bold">{indicators.macd.toFixed(3)}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Signal Line:</span>
                <div className="font-bold">{indicators.macdSignal.toFixed(3)}</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Moving Average Convergence Divergence
            </p>
          </div>
        </CardContent>
      </AnimatedCard>

      {/* Bollinger Bands */}
      <AnimatedCard variant="glass" delay={300}>
        <CardHeader>
          <CardTitle className="text-lg">Bollinger Bands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Position</span>
            <Badge variant={bollingerSignal.variant} className="text-xs">
              {bollingerSignal.signal}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Upper: ${indicators.bollingerUpper.toFixed(2)}</span>
              <span className="font-bold">Current: ${currentPrice.toFixed(2)}</span>
              <span>Lower: ${indicators.bollingerLower.toFixed(2)}</span>
            </div>
            <div className="relative">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000 ease-out animate-progress-fill"
                  style={{
                    width: `${Math.max(0, Math.min(100, 
                      ((currentPrice - indicators.bollingerLower) / 
                       (indicators.bollingerUpper - indicators.bollingerLower)) * 100
                    ))}%`,
                    animationDelay: '400ms'
                  }}
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <span className="text-xs text-muted-foreground">
              Middle Band (SMA 20): ${indicators.bollingerMiddle.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Volatility bands based on standard deviation
          </p>
        </CardContent>
      </AnimatedCard>
    </div>
  );
}