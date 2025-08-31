import { Card, CardContent, CardHeader } from './ui/card';
import { cn } from '../lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('skeleton rounded-md', className)} />
  );
}

export function MetricsCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader className="space-y-2">
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-20" />
      </CardContent>
    </Card>
  );
}

export function ChartSkeleton() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <Skeleton className="h-6 w-48 mx-auto" />
        <div className="h-[400px] flex items-end justify-between space-x-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i} 
              className="w-4 skeleton animate-pulse" 
              style={{ 
                height: `${Math.random() * 200 + 100}px`,
                animationDelay: `${i * 50}ms`
              }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

export function TechnicalIndicatorsSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((section) => (
        <Card key={section} className="animate-pulse">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-3 w-32" />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="animate-pulse-glow rounded-full h-16 w-16 bg-primary/20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
        </div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-chart-secondary/20 animate-gradient-shift opacity-50"></div>
      </div>
    </div>
  );
}

export function FullPageLoading() {
  return (
    <div className="min-h-screen bg-background particle-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Skeleton */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-96" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-lg" />
              ))}
            </div>
          </div>
        </Card>

        {/* Stock Selector Skeleton */}
        <div className="flex items-center space-x-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-64" />
        </div>

        {/* Metrics Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <MetricsCardSkeleton key={i} />
          ))}
        </div>

        {/* Chart Skeleton */}
        <ChartSkeleton />

        {/* Analysis Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <TechnicalIndicatorsSkeleton />
          <div className="space-y-6">
            <Card className="animate-pulse">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="animate-pulse">
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-3">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-2 w-full mb-2" />
                    <div className="grid grid-cols-3 gap-4">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <Skeleton key={j} className="h-8 w-12" />
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}