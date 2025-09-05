import {Button, styled, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 100px 0;
  text-align: center;
`;

const StyledButton = styled(Button)`
  margin-top: 30px;
`;

const NotFound = () => {
  return (
    <Container>
      <Typography>404</Typography>
      <Typography>
        찾을 수 없는 페이지 입니다.
        <br />
        요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨습니다.
      </Typography>

      <Link to="/event" replace>
        <StyledButton>홈으로 이동</StyledButton>
      </Link>
    </Container>
  );
};
export default NotFound;
