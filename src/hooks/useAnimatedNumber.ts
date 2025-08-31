import { useState, useEffect, useRef } from 'react';

export function useAnimatedNumber(
  targetValue: number,
  duration: number = 1000,
  formatFn?: (value: number) => string
) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    if (displayValue === targetValue) return;

    setIsAnimating(true);
    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current!;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = displayValue + (targetValue - displayValue) * easeOutCubic;
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetValue);
        setIsAnimating(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, duration, displayValue]);

  const formattedValue = formatFn ? formatFn(displayValue) : displayValue.toString();

  return { value: formattedValue, isAnimating };
}

export function useStaggerAnimation(itemCount: number, delay: number = 100) {
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    setVisibleItems(0);
    
    const showItems = () => {
      for (let i = 0; i < itemCount; i++) {
        setTimeout(() => {
          setVisibleItems(prev => prev + 1);
        }, i * delay);
      }
    };

    const timer = setTimeout(showItems, 100);
    return () => clearTimeout(timer);
  }, [itemCount, delay]);

  return visibleItems;
}

export function useIntersectionAnimation(threshold: number = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { elementRef, isVisible };
}