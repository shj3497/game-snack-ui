import {Button, Dialog, styled} from '@mui/material';
import classNames from 'classnames';
import {FC} from 'react';

interface Props {
  open: boolean;
  gameType?: 'miniGame' | 'randomGame';
  onClose?: () => void;
}

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

  .text {
    margin: 0;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.32px;

    margin-bottom: 22px;
  }
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

const RewardConfirmDialog: FC<Props> = ({
  open,
  gameType = 'miniGame',
  onClose,
}) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <Container>
        <span className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <circle
              cx="24"
              cy="24"
              r="24"
              fill={gameType === 'miniGame' ? '#00FFBC' : '#00FCFF'}
            />
            <path
              d="M32.4668 13.7158C33.1166 12.938 34.2624 12.7637 35.1201 13.3437C35.9779 13.9239 36.2428 15.0525 35.7627 15.9453L35.6562 16.1201L23.4824 34.1201C23.1471 34.6159 22.6077 34.9356 22.0117 34.9912C21.4158 35.0467 20.8264 34.8325 20.4052 34.4072L12.5791 26.5049L12.4424 26.3525C11.8054 25.5639 11.857 24.4055 12.5927 23.6767C13.3284 22.9482 14.4871 22.9076 15.2695 23.5517L15.4209 23.6904L21.5332 29.8623L32.3437 13.8799L32.4668 13.7158Z"
              fill="white"
            />
          </svg>
        </span>
        <h4 className="text">적립되었습니다</h4>
        <StyledButton className={classNames(gameType)} onClick={onClose}>
          확인
        </StyledButton>
      </Container>
    </StyledDialog>
  );
};
export default RewardConfirmDialog;
