import {Outlet} from 'react-router-dom';
import SecondGameLayout from '../common/SecondGameLayout';
import {FC, ReactNode} from 'react';

interface Props {
  children?: ReactNode;
}

const FindSecondLayout: FC<Props> = ({children}) => {
  return (
    <SecondGameLayout>
      <Outlet />
      {children}
    </SecondGameLayout>
  );
};

export default FindSecondLayout;
