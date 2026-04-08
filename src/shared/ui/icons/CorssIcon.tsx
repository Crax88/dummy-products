import React from 'react';
import type { IconProps } from './types';

export const CrossIcon = React.forwardRef<SVGSVGElement, IconProps>(
  function CrossIcon({ size = 24, className, ...props }, ref) {
    return (
      <svg
        ref={ref}
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 17 18'
        fill='currentColor'
        className={className}
        {...props}
      >
        <path
          d='M1.01031 1L15.0103 17'
          stroke='#C9C9C9'
          stroke-width='2'
          stroke-linecap='round'
        />
        <path
          d='M15 1L1 17'
          stroke='#C9C9C9'
          stroke-width='2'
          stroke-linecap='round'
        />
      </svg>
    );
  },
);
