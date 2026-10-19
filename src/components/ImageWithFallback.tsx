import React, { useState } from 'react';
import { Cpu, ImageOff } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto';
  caption?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = '16/9',
  caption,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <figure className="relative w-full overflow-hidden rounded-2xl bg-[#141b34] border border-[#1f2a4d] group">
      {!hasError ? (
        <>
          {/* Skeleton placeholder while loading */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#141b34] via-[#1a2344] to-[#141b34] animate-pulse flex items-center justify-center">
              <Cpu className="w-8 h-8 text-cyan-400/40 animate-pulse" />
            </div>
          )}
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full object-cover transition-all duration-500 group-hover:scale-[1.01] ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            style={{
              aspectRatio: aspectRatio === 'auto' ? undefined : aspectRatio,
              minHeight: '220px',
            }}
          />
        </>
      ) : (
        /* Styled CSS Fallback container */
        <div
          className="w-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#141b34] via-[#0f162c] to-[#0b1020] text-center"
          style={{ aspectRatio: aspectRatio === 'auto' ? '16/9' : aspectRatio, minHeight: '220px' }}
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
            <Cpu className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-[#e5e9f5] max-w-sm">{alt}</p>
          <span className="text-xs text-[#9aa6c7] mt-1 flex items-center gap-1.5">
            <ImageOff className="w-3.5 h-3.5" />
            Illustration technique IoT
          </span>
        </div>
      )}

      {caption && (
        <figcaption className="px-4 py-2 text-xs text-[#9aa6c7] bg-[#0b1020]/80 backdrop-blur-sm border-t border-[#1f2a4d] flex items-center justify-between">
          <span>{caption}</span>
        </figcaption>
      )}
    </figure>
  );
};
