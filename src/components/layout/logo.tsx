import React from 'react';

export function SpiceMealLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <path 
        d="M12 2C10.5 2 9.5 3.5 9.5 5C9.5 6.5 10.5 8 12 8C13.5 8 14.5 6.5 14.5 5C14.5 3.5 13.5 2 12 2Z" 
        fill="currentColor" 
        className="text-primary"
      />
      <path 
        d="M19 10C17.5 8.5 15.5 8 13.5 8H10.5C8.5 8 6.5 8.5 5 10C3.5 11.5 3 13.5 3 15.5C3 18.5 5.5 21 8.5 21C10.5 21 12 20 12 20C12 20 13.5 21 15.5 21C18.5 21 21 18.5 21 15.5C21 13.5 20.5 11.5 19 10Z" 
        fill="currentColor" 
        className="text-primary opacity-80"
      />
      <path 
        d="M12 11V16" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        className="text-background"
      />
      <path 
        d="M9 13.5C9 13.5 10.5 15 12 15C13.5 15 15 13.5 15 13.5" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        className="text-background"
      />
    </svg>
  );
}
