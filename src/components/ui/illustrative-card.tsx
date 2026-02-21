import React from 'react';
import { cn } from '@/lib/utils';
interface IllustrativeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent';
  sketchyBorder?: boolean;
}
/**
 * IllustrativeCard: A base component for organic-feeling containers.
 * Note: Uses padding to ensure children elements (like images or text) 
 * do not get clipped by the irregular sketchy border geometry.
 */
export function IllustrativeCard({
  children,
  className,
  variant = 'default',
  sketchyBorder = true,
  ...props
}: IllustrativeCardProps) {
  return (
    <div
      className={cn(
        "bg-white transition-transform hover:-translate-y-1",
        sketchyBorder ? "sketchy-border-sm" : "border-2 border-hope-blue rounded-xl",
        "hard-shadow-sm p-6 overflow-hidden",
        variant === 'accent' && "bg-hope-gold/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}