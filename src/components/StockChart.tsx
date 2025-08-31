import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { StockData } from '../types/stock';
import { AnimatedCard } from './AnimatedCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StockChartProps {
  stockData: StockData;
  showPredictions?: boolean;
}

export function StockChart({ stockData, showPredictions = true }: StockChartProps) {
  const historicalData = stockData.historicalData.slice(-90); // Last 90 days
  const predictionData = stockData.predictions.slice(0, 30); // Next 30 days

  const historicalLabels = historicalData.map(d => {
    const date = new Date(d.date);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const predictionLabels = predictionData.map(d => {
    const date = new Date(d.date);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const allLabels = [...historicalLabels, ...predictionLabels];
  
  const historicalPrices = historicalData.map(d => d.price);
  const predictionPrices = predictionData.map(d => d.predictedPrice);
  const upperBounds = predictionData.map(d => d.upperBound);
  const lowerBounds = predictionData.map(d => d.lowerBound);

  // Combine historical and prediction data for seamless line
  const allPrices = [
    ...historicalPrices,
    ...Array(predictionData.length).fill(null),
  ];

  const allPredictions = [
    ...Array(historicalData.length - 1).fill(null),
    historicalPrices[historicalPrices.length - 1], // Connect to last historical point
    ...predictionPrices,
  ];

  const data = {
    labels: allLabels,
    datasets: [
      {
        label: 'Historical Price',
        data: allPrices,
        borderColor: 'hsl(var(--chart-primary))',
        backgroundColor: 'hsl(var(--chart-primary) / 0.1)',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        fill: false,
        tension: 0.1,
      },
      ...(showPredictions ? [
        {
          label: 'Predicted Price',
          data: allPredictions,
          borderColor: 'hsl(var(--financial-prediction))',
          backgroundColor: 'hsl(var(--financial-prediction) / 0.1)',
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0,
          pointHoverRadius: 4,
          fill: false,
          tension: 0.1,
        },
        {
          label: 'Confidence Interval',
          data: [
            ...Array(historicalData.length).fill(null),
            ...upperBounds,
          ],
          borderColor: 'hsl(var(--financial-prediction) / 0.3)',
          backgroundColor: 'hsl(var(--financial-prediction) / 0.1)',
          borderWidth: 1,
          pointRadius: 0,
          fill: '+1',
          tension: 0.1,
        },
        {
          label: '',
          data: [
            ...Array(historicalData.length).fill(null),
            ...lowerBounds,
          ],
          borderColor: 'hsl(var(--financial-prediction) / 0.3)',
          backgroundColor: 'hsl(var(--financial-prediction) / 0.1)',
          borderWidth: 1,
          pointRadius: 0,
          fill: false,
          tension: 0.1,
        },
      ] : []),
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: `${stockData.symbol} - Price Analysis & Predictions`,
        color: 'hsl(var(--foreground))',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: 'hsl(var(--foreground))',
          filter: (legendItem: any) => legendItem.text !== '', // Hide empty labels
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'hsl(var(--popover))',
        titleColor: 'hsl(var(--popover-foreground))',
        bodyColor: 'hsl(var(--popover-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label && label !== '') {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
          color: 'hsl(var(--muted-foreground))',
        },
        grid: {
          color: 'hsl(var(--border))',
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          maxTicksLimit: 10,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Price (USD)',
          color: 'hsl(var(--muted-foreground))',
        },
        grid: {
          color: 'hsl(var(--border))',
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          callback: function(value: any) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(value);
          },
        },
      },
    },
  };

  return (
    <AnimatedCard variant="glass" className="p-6">
      <div className="h-[400px] chart-animate">
        <Line 
          data={data} 
          options={options} 
          plugins={[{
            id: 'chartAnimation',
            beforeDraw: (chart) => {
              const ctx = chart.ctx;
              ctx.save();
              ctx.globalCompositeOperation = 'source-over';
              ctx.restore();
            }
          }]}
        />
      </div>
    </AnimatedCard>
  );
}