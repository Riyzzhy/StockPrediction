import { ReactNode, useState } from 'react';
import { Card } from './ui/card';
import { cn } from '../lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'default' | 'glass' | 'hover-glow' | 'interactive';
  hoverEffect?: boolean;
}

export function AnimatedCard({ 
  children, 
  className, 
  delay = 0, 
  variant = 'default',
  hoverEffect = true 
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getVariantClasses = () => {
    switch (variant) {
      case 'glass':
        return 'glass-card';
      case 'hover-glow':
        return 'hover-glow';
      case 'interactive':
        return 'interactive-scale';
      default:
        return '';
    }
  };

  const baseClasses = cn(
    'stagger-animation transition-all duration-300',
    getVariantClasses(),
    hoverEffect && 'hover:shadow-lg hover:-translate-y-1',
    className
  );

  return (
    <Card
      className={baseClasses}
      style={{ 
        animationDelay: `${delay}ms`,
        transform: isHovered && hoverEffect ? 'translateY(-4px)' : undefined,
        boxShadow: isHovered && hoverEffect ? '0 20px 40px hsl(var(--foreground) / 0.1)' : undefined
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Card>
  );
}

export function AnimatedGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('grid gap-4', className)}>
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <div 
              key={index} 
              className="stagger-animation" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {child}
            </div>
          ))
        : children
      }
    </div>
  );
}