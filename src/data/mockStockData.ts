import { StockData, ModelPerformance, FeatureImportance, HistoricalDataPoint, PredictionData } from '../types/stock';

// Generate mock historical data
function generateHistoricalData(basePrice: number, days: number = 365): HistoricalDataPoint[] {
  const data: HistoricalDataPoint[] = [];
  let currentPrice = basePrice;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Simulate price movement with some randomness and trend
    const volatility = 0.02;
    const trend = Math.sin(i / 30) * 0.001; // Seasonal trend
    const randomChange = (Math.random() - 0.5) * volatility;
    const priceChange = trend + randomChange;
    
    currentPrice *= (1 + priceChange);
    
    const high = currentPrice * (1 + Math.random() * 0.02);
    const low = currentPrice * (1 - Math.random() * 0.02);
    const open = currentPrice * (1 + (Math.random() - 0.5) * 0.01);
    const volume = Math.floor(Math.random() * 10000000) + 1000000;

    data.push({
      date: date.toISOString().split('T')[0],
      price: Number(currentPrice.toFixed(2)),
      volume,
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      open: Number(open.toFixed(2)),
      close: Number(currentPrice.toFixed(2)),
    });
  }

  return data;
}

// Generate mock prediction data
function generatePredictions(currentPrice: number, days: number = 30): PredictionData[] {
  const predictions: PredictionData[] = [];
  const models: Array<'LSTM' | 'ARIMA' | 'Random Forest' | 'XGBoost'> = ['LSTM', 'ARIMA', 'Random Forest', 'XGBoost'];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Simulate prediction with decreasing confidence over time
    const baseChange = Math.sin(i / 10) * 0.02 + (Math.random() - 0.5) * 0.05;
    const predictedPrice = currentPrice * (1 + baseChange * (i + 1) / days);
    const confidence = Math.max(0.6, 0.95 - (i * 0.01));
    const uncertainty = predictedPrice * (1 - confidence) * 0.5;
    
    predictions.push({
      date: date.toISOString().split('T')[0],
      predictedPrice: Number(predictedPrice.toFixed(2)),
      confidence: Number(confidence.toFixed(3)),
      upperBound: Number((predictedPrice + uncertainty).toFixed(2)),
      lowerBound: Number((predictedPrice - uncertainty).toFixed(2)),
      model: models[i % models.length],
    });
  }

  return predictions;
}

// Stock symbols with their base data
const stockSymbols = [
  { symbol: 'AAPL', name: 'Apple Inc.', basePrice: 175.43 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', basePrice: 142.56 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', basePrice: 378.85 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', basePrice: 145.86 },
  { symbol: 'TSLA', name: 'Tesla Inc.', basePrice: 248.50 },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', basePrice: 875.28 },
  { symbol: 'META', name: 'Meta Platforms Inc.', basePrice: 353.96 },
  { symbol: 'NFLX', name: 'Netflix Inc.', basePrice: 442.60 },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', basePrice: 154.78 },
  { symbol: 'V', name: 'Visa Inc.', basePrice: 267.92 },
];

// Generate mock stock data
export function generateMockStockData(symbol: string): StockData {
  const stockInfo = stockSymbols.find(s => s.symbol === symbol) || stockSymbols[0];
  const currentPrice = stockInfo.basePrice;
  const priceChange = (Math.random() - 0.5) * 10;
  const priceChangePercent = (priceChange / currentPrice) * 100;
  
  const historicalData = generateHistoricalData(currentPrice * 0.9, 365);
  const predictions = generatePredictions(currentPrice, 30);

  return {
    symbol: stockInfo.symbol,
    name: stockInfo.name,
    currentPrice,
    priceChange: Number(priceChange.toFixed(2)),
    priceChangePercent: Number(priceChangePercent.toFixed(2)),
    volume: Math.floor(Math.random() * 100000000) + 10000000,
    marketCap: Math.floor(Math.random() * 1000000000000) + 100000000000,
    dailyHigh: Number((currentPrice * 1.03).toFixed(2)),
    dailyLow: Number((currentPrice * 0.97).toFixed(2)),
    historicalData,
    predictions,
    technicalIndicators: {
      sma20: Number((currentPrice * 0.98).toFixed(2)),
      sma50: Number((currentPrice * 0.95).toFixed(2)),
      ema12: Number((currentPrice * 1.01).toFixed(2)),
      ema26: Number((currentPrice * 0.99).toFixed(2)),
      rsi: Number((Math.random() * 40 + 30).toFixed(1)),
      macd: Number((Math.random() * 4 - 2).toFixed(2)),
      macdSignal: Number((Math.random() * 4 - 2).toFixed(2)),
      bollingerUpper: Number((currentPrice * 1.05).toFixed(2)),
      bollingerLower: Number((currentPrice * 0.95).toFixed(2)),
      bollingerMiddle: Number((currentPrice * 1.0).toFixed(2)),
    },
  };
}

export const mockModelPerformance: ModelPerformance[] = [
  {
    model: 'LSTM Neural Network',
    accuracy: 0.847,
    mae: 2.34,
    rmse: 3.12,
    r2Score: 0.923,
    lastUpdated: '2024-01-15T10:30:00Z',
  },
  {
    model: 'Random Forest',
    accuracy: 0.812,
    mae: 2.78,
    rmse: 3.45,
    r2Score: 0.896,
    lastUpdated: '2024-01-15T10:30:00Z',
  },
  {
    model: 'ARIMA',
    accuracy: 0.789,
    mae: 3.12,
    rmse: 4.01,
    r2Score: 0.873,
    lastUpdated: '2024-01-15T10:30:00Z',
  },
  {
    model: 'XGBoost',
    accuracy: 0.825,
    mae: 2.56,
    rmse: 3.28,
    r2Score: 0.908,
    lastUpdated: '2024-01-15T10:30:00Z',
  },
];

export const mockFeatureImportance: FeatureImportance[] = [
  {
    feature: 'Previous Close Price',
    importance: 0.342,
    description: 'Previous trading day closing price',
  },
  {
    feature: 'Trading Volume',
    importance: 0.187,
    description: 'Daily trading volume in shares',
  },
  {
    feature: 'Moving Average (20d)',
    importance: 0.156,
    description: '20-day simple moving average',
  },
  {
    feature: 'RSI (14d)',
    importance: 0.123,
    description: '14-day Relative Strength Index',
  },
  {
    feature: 'Market Volatility',
    importance: 0.089,
    description: 'Market-wide volatility index',
  },
  {
    feature: 'Sector Performance',
    importance: 0.067,
    description: 'Industry sector performance',
  },
  {
    feature: 'News Sentiment',
    importance: 0.036,
    description: 'Sentiment analysis of news articles',
  },
];

export const availableStocks = stockSymbols.map(stock => ({
  symbol: stock.symbol,
  name: stock.name,
}));