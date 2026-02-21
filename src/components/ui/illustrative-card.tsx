import React from 'react';
import { cn } from '@/lib/utils';
interface IllustrativeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent';
  sketchyBorder?: boolean;
}
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
        sketchyBorder ? "sketchy-border-sm" : "border-2 border-deep-ocean rounded-xl",
        "hard-shadow-sm p-6",
        variant === 'accent' && "bg-terra-cotta/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}