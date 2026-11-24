import { useState } from 'react';
import { Scissors } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  loading = 'lazy',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#141418] text-zinc-500 p-6 text-center ${containerClassName}`}
        role="img"
        aria-label={alt}
      >
        <Scissors className="w-6 h-6 mb-2 text-zinc-600" strokeWidth={1.5} />
        <span className="text-xs font-medium text-zinc-400 max-w-[180px] leading-relaxed">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
