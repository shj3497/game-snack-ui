import React from 'react';
import {motion} from 'framer-motion';

const GamePageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <motion.section
      initial={{opacity: 0, x: 20}}
      animate={{opacity: 1, x: 0}}
      exit={{opacity: 0, x: -20}}
      transition={{duration: 0.3}}
    >
      {children}
    </motion.section>
  );
};

export default GamePageLayout;
