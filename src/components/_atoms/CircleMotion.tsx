import {alpha} from '@mui/material';
import {motion, MotionProps, Variants} from 'framer-motion';
import {FC} from 'react';

export interface Props extends MotionProps {
  className?: string;
  pathLength?: number; // 0 ~ 1
  rotate?: string | number; // 45 or -85
  duration?: number;
  delay?: number;

  activeColor?: string;
  defaultColor?: string;
}

const CircleMotion: FC<Props> = ({
  className,
  pathLength = 1,
  rotate = 45,
  duration = 1,
  delay = 0.4,
  activeColor = '#00FFBC',
  defaultColor = '#ffffff',
  ...props
}) => {
  const variants: Variants = {
    hidden: {pathLength: 0, opacity: 0, rotate},
    visible: {
      pathLength,
      opacity: 1,
      rotate,
      fill: activeColor === 'transparent' ? 'none' : alpha(activeColor, 0.25),
      transition: {
        pathLength: {delay, type: 'spring', duration, bounce: 0},
        opacity: {delay, duration: 0.01},
      },
    },
  };

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="62"
      height="62"
      viewBox="0 0 62 62"
      fill="none"
    >
      <circle cx="31" cy="31" r="30" stroke={defaultColor} strokeWidth="2" />
      <motion.circle
        cx="31"
        cy="31"
        r="30"
        stroke={activeColor}
        strokeWidth="2"
        variants={variants}
        {...props}
      />
    </svg>
  );
};
export default CircleMotion;
