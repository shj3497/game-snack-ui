import {Button, ButtonProps} from '@mui/material';

const GameButton = ({sx, ...props}: ButtonProps) => {
  return (
    <Button
      {...props}
      sx={{
        width: '100%',
        height: '60px',
        borderRadius: '13px',
        fontSize: '18px',
        fontWeight: 700,
        letterSpacing: '-0.36px',
        ...sx,
      }}
    />
  );
};
export default GameButton;
