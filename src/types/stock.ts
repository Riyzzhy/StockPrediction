export interface StockData {
  symbol: string;
  name: string;
  currentPrice: number;
  priceChange: number;
  priceChangePercent: number;
  volume: number;
  marketCap: number;
  dailyHigh: number;
  dailyLow: number;
  historicalData: HistoricalDataPoint[];
  predictions: PredictionData[];
  technicalIndicators: TechnicalIndicators;
}

export interface HistoricalDataPoint {
  date: string;
  price: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  close: number;
}

export interface PredictionData {
  date: string;
  predictedPrice: number;
  confidence: number;
  upperBound: number;
  lowerBound: number;
  model: 'LSTM' | 'ARIMA' | 'Random Forest' | 'XGBoost';
}

export interface TechnicalIndicators {
  sma20: number;
  sma50: number;
  ema12: number;
  ema26: number;
  rsi: number;
  macd: number;
  macdSignal: number;
  bollingerUpper: number;
  bollingerLower: number;
  bollingerMiddle: number;
}

export interface ModelPerformance {
  model: string;
  accuracy: number;
  mae: number;
  rmse: number;
  r2Score: number;
  lastUpdated: string;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
  description: string;
}