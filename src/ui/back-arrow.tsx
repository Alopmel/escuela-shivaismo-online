import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useMenu } from '@/app/context/MenuContext';

const BackArrow: React.FC = () => {
  const { goBack } = useMenu();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        goBack();
      }}
      className="absolute top-4 left-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
    >
      <ArrowLeftIcon className="h-6 w-6 text-white" />
    </button>
  );
};

export default BackArrow;