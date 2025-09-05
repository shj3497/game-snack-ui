import {FC, ReactNode} from 'react';
import {Outlet} from 'react-router-dom';
import RandomGameLayout from '../common/RandomGameLayout';

interface Props {
  children?: ReactNode;
}

const RouletteLayout: FC<Props> = ({children}) => {
  return (
    <RandomGameLayout>
      <Outlet />
      {children}
    </RandomGameLayout>
  );
};
export default RouletteLayout;
