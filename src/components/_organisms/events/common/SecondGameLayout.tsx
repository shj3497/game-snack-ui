import {styled} from '@mui/material';
import {FC, ReactNode} from 'react';

interface Props {
  children?: ReactNode;
}

const Container = styled('div')`
  width: 100%;
  height: 100dvh;
  background-color: #00befa;
`;

const Inner = styled('div')`
  width: 100%;
  height: 740px;
  display: flex;
  justify-content: center;
  background: linear-gradient(
    180deg,
    #1e76f4 0%,
    #0859cc 21.63%,
    #0859cc 43.75%,
    #00befa 86.06%
  );
`;

const SecondGameLayout: FC<Props> = ({children}) => {
  return (
    <Container>
      <Inner>{children}</Inner>
    </Container>
  );
};

export default SecondGameLayout;
