// components/ui/Card.tsx

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'glass' | 'gradient';
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  onClick,
}: CardProps) {
  const variants = {
    default: 'card',
    dark: 'card-dark',
    glass: 'card-glass',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100',
  };

  return (
    <div 
      className={`
        ${variants[variant]}
        ${hover ? 'hover:shadow-xl hover:-translate-y-1' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}