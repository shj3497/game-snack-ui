import useAlert from '@/lib/store/useAlert';
import {Button, Dialog, styled} from '@mui/material';
import {FC} from 'react';

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 15px;
  }
`;

const Container = styled('div')`
  width: 280px;
  padding: 28px 17px 18px 17px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .icon {
    display: flex;
    margin-bottom: 10px;
  }
`;

const Text = styled('p')`
  margin: 0;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.32px;
  white-space: pre-wrap;
  word-break: keep-all;

  margin-bottom: 22px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 40px;
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 600;

  border-radius: 10px;

  &.miniGame {
    background-color: ${({theme}) => theme.palette.game_green.main};
  }
  &.randomGame {
    background-color: ${({theme}) => theme.palette.game_mint.main};
  }
`;

const AlertDialog = () => {
  const {open, message, gameType, onClose} = useAlert();

  return (
    <DialogView
      open={open}
      message={message}
      gameType={gameType}
      onClose={onClose}
    />
  );
};

interface DialogViewProps {
  open: boolean;
  message: string;
  gameType?: 'miniGame' | 'randomGame';
  onClose: () => void;
}
const DialogView: FC<DialogViewProps> = ({
  open,
  message,
  gameType,
  onClose,
}) => {
  return (
    <StyledDialog open={open}>
      <Container>
        <Text>{message}</Text>
        <StyledButton className={gameType} onClick={onClose}>
          확인
        </StyledButton>
      </Container>
    </StyledDialog>
  );
};
export default AlertDialog;
