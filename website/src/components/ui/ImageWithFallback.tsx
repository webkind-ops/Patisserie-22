import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Cake } from 'lucide-react'; // Fallback icon

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className,
  fallbackClassName,
  containerClassName,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-lavender-50 flex items-center justify-center", containerClassName)}>
      {(!src || error) ? (
        <div className={cn("flex flex-col items-center justify-center text-lavender-300 w-full h-full min-h-[120px]", fallbackClassName)}>
          <Cake className="w-8 h-8 opacity-50 mb-2" />
          <span className="text-xs font-medium uppercase tracking-wider opacity-60">Image coming soon</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt || "Product image"}
          className={cn(
            "object-cover transition-opacity duration-300",
            loaded ? "opacity-100" : "opacity-0",
            className
          )}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(true);
          }}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
};
