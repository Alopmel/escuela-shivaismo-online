'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelectedLayoutSegment } from 'next/navigation';
import useScroll from '@/app/hooks/use-scroll';
import { cn } from '@/lib/utils';

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200 backdrop-blur-md bg-white/30 shadow-lg`,
        {
          'border-b border-gray-200 bg-white/75 backdrop-blur-lg shadow-md': scrolled,
          'border-b border-gray-200 bg-white/60 backdrop-blur-md shadow-md': selectedLayout,
        },
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
        <Link href="/portal">
            <Image src="/logo_login.png" alt="Logo" width={80} height={80} />
        </Link>
        </div>

        <div className="hidden md:block">
          <div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center">
            <span className="font-semibold text-sm">HQ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
