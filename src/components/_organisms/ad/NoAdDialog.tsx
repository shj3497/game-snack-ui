import {Box, Button, Dialog, styled} from '@mui/material';
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

const NoAdDialog: FC<Props> = ({open, gameType = 'miniGame', onClose}) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <Container>
        <p className="text">
          광고 이용이 지연되고 있습니다.
          <br />
          잠시 후 다시 시도 부탁드립니다.
        </p>
        <StyledButton className={classNames(gameType)} onClick={onClose}>
          확인
        </StyledButton>
      </Container>
    </StyledDialog>
  );
};
export default NoAdDialog;
