import React, { useEffect } from 'react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex min-h-screen items-center justify-center p-4'>
        <div
          className='fixed inset-0 bg-gray-100 bg-opacity-90 transition-opacity'
          onClick={onClose}
        />
        <div className='relative bg-white rounded-lg shadow-xl max-w-md w-full p-1'>
          <div className='flex justify-between items-center p-4 border-b'>
            <h2 className='text-xl font-semibold'>{title}</h2>
            <Button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-600'
            >
              ✕
            </Button>
          </div>
          <div className='p-4'>{children}</div>
        </div>
      </div>
    </div>
  );
};
