import {styled} from '@mui/material';
import {AnimatePresence} from 'framer-motion';
import {Outlet} from 'react-router-dom';
import DebugDrawer from './components/_molecules/DebugDrawer';
import useUserInfoConfig from './lib/store/user-info-config/useUserInfoConfig';
import AlertDialog from './components/_molecules/AlertDialog';
import AdDebugDrawer from './components/_molecules/AdDebugDrawer';

const Main = styled('main')`
  width: 100%;
  height: 100%;
  min-height: 100dvh;
  overflow-x: hidden;
`;

const App = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  useUserInfoConfig();
  return (
    <Main>
      <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>
      {!isProduction && <DebugDrawer />}
      <AdDebugDrawer />
      <AlertDialog />
    </Main>
  );
};
export default App;
