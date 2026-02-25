import React from 'react';

const GlassCard = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false,
  onClick 
}) => {
  const baseClasses = 'glass-card p-6';
  
  const variantClasses = {
    default: '',
    light: 'glass-light',
    dark: 'glass',
  };

  const hoverClasses = hover 
    ? 'transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg cursor-pointer' 
    : '';

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
