import React from 'react';
import type { IconProps } from './types';

export const PlusOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
  function PlusOutlinedIcon({ size = 24, className, ...props }, ref) {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        {...props}
      >
        <path
          d='M12 5V19'
          stroke='white'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M5 12H19'
          stroke='white'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    );
  },
);
