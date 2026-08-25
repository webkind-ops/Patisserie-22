import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appConfig } from '@/constants/appConfig';

export interface SplashLoaderProps {
  onComplete?: () => void;
  durationMs?: number;
}

export const SplashLoader: React.FC<SplashLoaderProps> = ({
  onComplete,
  durationMs = 5100,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start slow luxury fade out 1.2s before unmounting
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, durationMs - 1200);

    // Complete transition and reveal menu
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        onComplete();
      }
    }, durationMs);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [durationMs, onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        onComplete();
      }
    }, 400);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="cinematic-splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: isFadingOut ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          onClick={handleSkip}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black cursor-pointer select-none px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{
              opacity: isFadingOut ? 0 : 1,
              y: isFadingOut ? -8 : 0,
              scale: isFadingOut ? 1.015 : 1,
            }}
            transition={{
              duration: 1.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col items-center justify-center text-center max-w-lg"
          >
            {/* Bakery Brand Title */}
            <motion.h1
              initial={{ opacity: 0, letterSpacing: '0.03em' }}
              animate={{
                opacity: isFadingOut ? 0 : 1,
                letterSpacing: '0.08em',
              }}
              transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-[0.08em] drop-shadow-[0_4px_30px_rgba(255,255,255,0.15)]"
            >
              {appConfig.store.storeName}
            </motion.h1>

            {/* Elegant Minimal Line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: isFadingOut ? 0 : 1,
                opacity: isFadingOut ? 0 : 0.45,
              }}
              transition={{
                duration: 1.2,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-24 h-[1px] bg-gradient-to-r from-transparent via-purple-300 to-transparent my-4"
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isFadingOut ? 0 : 0.9,
                y: isFadingOut ? -4 : 0,
              }}
              transition={{
                duration: 1.4,
                delay: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-serif italic text-base sm:text-lg md:text-xl text-purple-200 tracking-wider font-normal"
            >
              {appConfig.store.tagline}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashLoader;
