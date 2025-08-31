import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Header } from './components/Header';
import { StockSelector } from './components/StockSelector';
import { StockChart } from './components/StockChart';
import { MetricsCard } from './components/MetricsCard';
import { TechnicalIndicators } from './components/TechnicalIndicators';
import { PredictionSummary } from './components/PredictionSummary';
import { FeatureImportance } from './components/FeatureImportance';
import { ModelComparison } from './components/ModelComparison';
import { FullPageLoading } from './components/LoadingSkeleton';
import { AnimatedGrid } from './components/AnimatedCard';

import { generateMockStockData, mockModelPerformance, mockFeatureImportance } from './data/mockStockData';
import { StockData } from './types/stock';
import { useStaggerAnimation } from './hooks/useAnimatedNumber';

const queryClient = new QueryClient();

function StockPredictionApp() {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);
  const visibleMetrics = useStaggerAnimation(4, 150);

  useEffect(() => {
    setLoading(true);
    // Simulate API call delay with staggered loading
    const timer = setTimeout(() => {
      setStockData(generateMockStockData(selectedStock));
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [selectedStock]);

  const handleStockChange = (symbol: string) => {
    setSelectedStock(symbol);
  };

  if (loading || !stockData) {
    return <FullPageLoading />;
  }

  return (
    <div className="min-h-screen bg-background particle-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Header />

        {/* Stock Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <StockSelector selectedStock={selectedStock} onStockChange={handleStockChange} />
        </div>

        {/* Key Metrics */}
        <AnimatedGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {visibleMetrics >= 1 && (
            <MetricsCard
              title="Current Price"
              value={stockData.currentPrice}
              change={stockData.priceChange}
              changePercent={stockData.priceChangePercent}
              variant={stockData.priceChange > 0 ? 'success' : stockData.priceChange < 0 ? 'danger' : 'default'}
              delay={0}
            />
          )}
          {visibleMetrics >= 2 && (
            <MetricsCard
              title="Market Cap"
              value={new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact',
                maximumFractionDigits: 1,
              }).format(stockData.marketCap)}
              subtitle="Total market value"
              delay={150}
            />
          )}
          {visibleMetrics >= 3 && (
            <MetricsCard
              title="Volume"
              value={new Intl.NumberFormat('en-US', {
                notation: 'compact',
                maximumFractionDigits: 1,
              }).format(stockData.volume)}
              subtitle="Shares traded today"
              delay={300}
            />
          )}
          {visibleMetrics >= 4 && (
            <MetricsCard
              title="Daily Range"
              value={`$${stockData.dailyLow} - $${stockData.dailyHigh}`}
              subtitle="Today's trading range"
              delay={450}
            />
          )}
        </AnimatedGrid>

        {/* Main Chart */}
        <StockChart stockData={stockData} showPredictions={true} />

        {/* Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Technical Analysis */}
          <div className="space-y-6">
            <TechnicalIndicators 
              indicators={stockData.technicalIndicators}
              currentPrice={stockData.currentPrice}
            />
          </div>

          {/* Middle Column - Predictions */}
          <div className="space-y-6">
            <PredictionSummary 
              predictions={stockData.predictions}
              currentPrice={stockData.currentPrice}
            />
          </div>

          {/* Right Column - Model Analysis */}
          <div className="space-y-6">
            <ModelComparison models={mockModelPerformance} />
            <FeatureImportance features={mockFeatureImportance} />
          </div>
        </div>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="dark">
        <StockPredictionApp />
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;