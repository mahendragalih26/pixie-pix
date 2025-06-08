'use client';

import { cn } from '@/helper/utils';
import type IImage from 'next/image';
import Image from 'next/image';
import { ComponentProps, useCallback, useState } from 'react';

const NextImage = (props: ComponentProps<typeof IImage>) => {
  const [isLoading, setLoading] = useState(true);

  // Optimized event handler using useCallback
  const handleOnLoad = useCallback(() => {
    setLoading(false);
  }, [setLoading]); // Only setLoading is a dependency

  return (
    <Image
      {...props}
      src={props.src}
      alt={props.alt || ''}
      priority
      className={cn(
        props.className,
        'duration-700 ease-in-out',
        isLoading ? 'scale-105 blur-sm' : 'scale-100 blur-0'
      )}
      onLoad={handleOnLoad}
    />
  );
};

export default NextImage;
