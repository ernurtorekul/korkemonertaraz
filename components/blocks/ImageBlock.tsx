'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Block } from '@/types/article';

interface ImageBlockProps {
  block: Block;
}

export default function ImageBlock({ block }: ImageBlockProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Don't render if no content
  if (!block.content || block.content.trim() === '') {
    return null;
  }

  return (
    <div className="my-8">
      <div className="relative w-full h-auto rounded-lg overflow-hidden shadow-lg">
        {isLoading && !hasError && (
          <div className="aspect-video bg-gray-200 animate-pulse" />
        )}
        {hasError ? (
          <div className="aspect-video bg-gray-100 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Сурет жүктелмеді</p>
            </div>
          </div>
        ) : (
          <Image
            src={block.content}
            alt="Article image"
            width={1200}
            height={800}
            className="w-full h-auto"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
            unoptimized
          />
        )}
      </div>
    </div>
  );
}
