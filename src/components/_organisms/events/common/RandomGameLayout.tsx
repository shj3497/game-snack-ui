import {styled} from '@mui/material';
import {FC, ReactNode} from 'react';

interface Props {
  children?: ReactNode;
}

const Container = styled('div')`
  width: 100%;
  height: 100dvh;
  background-color: #ba6fe6;
`;

const Inner = styled('div')`
  width: 100%;
  height: 740px;
  display: flex;
  justify-content: center;
  background: linear-gradient(180deg, #4a18d1 0%, #6e46da 50%, #ba6fe6 100%);
`;

const RandomGameLayout: FC<Props> = ({children}) => {
  return (
    <Container>
      <Inner>{children}</Inner>
    </Container>
  );
};

export default RandomGameLayout;
