import React from 'react';

interface StarBorderProps {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  color?: string;
  speed?: string;
  [key: string]: any;
}

export const StarBorder = ({
  as = 'button',
  className = '',
  children,
  color = '#D4AF37',
  speed = '3s',
  ...rest
}: StarBorderProps) => {
  const Component = as as any;
  return (
    <Component className={`relative inline-block overflow-hidden rounded-sm p-[1px] ${className}`} {...rest}>
      <span
        className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite]"
        style={{
          background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 80%, ${color} 100%)`,
          animationDuration: speed,
        }}
      />
      <div className="relative h-full w-full bg-yugen-charcoal px-8 py-4 flex items-center justify-center">
        {children}
      </div>
    </Component>
  );
};
