import React, {FC} from 'react';
import {motion} from 'framer-motion';

interface Props {
  delay?: number;
  className?: string;
  scale?: [number, number];
  children?: React.ReactNode;
}

const FloatingMotionIcon: FC<Props> = ({
  delay = 1,
  className,
  scale = [1, 1],
  children,
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: ['0px', '-10px'],
        scale: scale,
        transition: {
          y: {
            delay,
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          },
          scale: {
            duration: 0.3,
            ease: 'easeInOut',
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingMotionIcon;
