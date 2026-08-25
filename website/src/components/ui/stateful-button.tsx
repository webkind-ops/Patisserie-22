import React from 'react';
import { cn } from '@/utils/cn';
import { motion, useAnimate } from 'framer-motion';

export interface StatefulButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export const StatefulButton: React.FC<StatefulButtonProps> = ({
  className,
  children,
  ...props
}) => {
  const [scope, animate] = useAnimate();

  const animateLoading = async () => {
    await animate(
      '.loader',
      {
        width: '16px',
        scale: 1,
        display: 'block',
      },
      {
        duration: 0.15,
      }
    );
  };

  const animateSuccess = async () => {
    await animate(
      '.loader',
      {
        width: '0px',
        scale: 0,
        display: 'none',
      },
      {
        duration: 0.15,
      }
    );
    await animate(
      '.check',
      {
        width: '16px',
        scale: 1,
        display: 'block',
      },
      {
        duration: 0.15,
      }
    );

    await animate(
      '.check',
      {
        width: '0px',
        scale: 0,
        display: 'none',
      },
      {
        delay: 0.8,
        duration: 0.2,
      }
    );
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await animateLoading();
    if (props.onClick) {
      await props.onClick(event);
    }
    await animateSuccess();
  };

  const {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onAnimationStart,
    onAnimationEnd,
    ...buttonProps
  } = props;

  return (
    <motion.button
      layout
      ref={scope}
      className={cn(
        'relative inline-flex items-center justify-center gap-1.5 rounded-full bg-lavender-deep text-white px-4 py-1.5 text-xs font-semibold shadow-soft-xs hover:bg-lavender-900 active:scale-95 transition-all duration-200 select-none min-h-[32px]',
        className
      )}
      {...buttonProps}
      onClick={handleClick}
    >
      <motion.div layout className="flex items-center gap-1.5">
        <Loader />
        <CheckIcon />
        <motion.span layout>{children}</motion.span>
      </motion.div>
    </motion.button>
  );
};

export const Button = StatefulButton;

const Loader = () => {
  return (
    <motion.svg
      animate={{
        rotate: [0, 360],
      }}
      initial={{
        scale: 0,
        width: 0,
        display: 'none',
      }}
      style={{
        scale: 0.5,
        display: 'none',
      }}
      transition={{
        duration: 0.4,
        repeat: Infinity,
        ease: 'linear',
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="loader text-white shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </motion.svg>
  );
};

const CheckIcon = () => {
  return (
    <motion.svg
      initial={{
        scale: 0,
        width: 0,
        display: 'none',
      }}
      style={{
        scale: 0.5,
        display: 'none',
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="check text-emerald-300 shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </motion.svg>
  );
};

export default StatefulButton;
