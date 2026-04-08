import React from 'react';
import type { IconProps } from './types';

export const UserIcon = React.forwardRef<SVGSVGElement, IconProps>(
  function UserIcon({ size = 24, className, ...props }, ref) {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        {...props}
      >
        <circle cx='12' cy='7.25' r='4' stroke='#C9C9C9' stroke-width='2' />
        <path
          d='M9 13.75H15C16.6569 13.75 18 15.0931 18 16.75V20.75H6V16.75C6 15.0931 7.34315 13.75 9 13.75Z'
          stroke='#CACACA'
          stroke-width='2'
        />
      </svg>
    );
  },
);
