import {FC, ReactNode} from 'react';
import SecondGameLayout from '../common/SecondGameLayout';
import {Outlet} from 'react-router-dom';

interface Props {
  children?: ReactNode;
}

const DrawSecondLayout: FC<Props> = ({children}) => {
  return (
    <SecondGameLayout>
      <Outlet />
      {children}
    </SecondGameLayout>
  );
};
export default DrawSecondLayout;
