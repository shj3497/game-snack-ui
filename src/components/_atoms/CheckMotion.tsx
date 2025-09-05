import {styled} from '@mui/material';
import {motion, MotionProps, Variants} from 'framer-motion';
import {FC} from 'react';

interface Props extends MotionProps {
  className?: string;

  activeColor?: string;
  type?: 'success' | 'fail' | 'normal';
}

const Container = styled(motion.span)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;

  svg {
    position: absolute;
  }
`;

const CheckMotion: FC<Props> = ({
  className,
  activeColor = '#00FFBC',
  type = 'normal',
  ...props
}) => {
  const variants: Variants = {
    hidden: {opacity: 0, scale: 0},
    visible: () => {
      return {
        opacity: 1,
        scale: 1,
        transition: {
          scale: {delay: 1, type: 'spring', duration: 0.5, bounce: 0},
          opacity: {delay: 1, duration: 0.01},
        },
      };
    },
  };

  const getIcon = (type: Props['type']) => {
    if (type === 'success') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="8"
          viewBox="0 0 11 8"
          fill="none"
        >
          <path
            d="M1 3.25L4.46154 7L10 1"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    } else if (type === 'fail') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="15"
          viewBox="0 0 16 15"
          fill="none"
        >
          <path
            d="M11.5356 3.53552L4.46458 10.6066"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M11.5356 10.6066L4.46458 3.53553"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    } else {
      return null;
    }
  };

  if (type === 'normal') return null;

  return (
    <Container className={className} variants={variants} {...props}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
      >
        <motion.circle cx="11" cy="11" r="11" fill={activeColor} />
      </motion.svg>
      {getIcon(type)}
    </Container>
  );
};
export default CheckMotion;
