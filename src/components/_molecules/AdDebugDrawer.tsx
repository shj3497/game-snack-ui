import {
  Box,
  Drawer,
  IconButton,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import {FC, Fragment, useState} from 'react';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import {useCookies} from 'react-cookie';
import AdHistoryList from './AdHistoryList';
import CloseIcon from '@mui/icons-material/Close';

interface Props {}

const SettingButton = styled(IconButton)`
  position: fixed;
  z-index: 8888;
  top: 16px;
  right: 16px;
  border: 1px solid ${({theme}) => theme.palette.game_mint.main};
  color: ${({theme}) => theme.palette.game_mint.main};
`;

interface CookiesValues {
  'finflow:ad:debug': boolean;
}

const AdDebugDrawer: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [cookies] = useCookies<'finflow:ad:debug', CookiesValues>([
    'finflow:ad:debug',
  ]);
  const isVisible = cookies['finflow:ad:debug'];
  const isProduction = process.env.NODE_ENV === 'production';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!isVisible && isProduction) {
    return null;
  }

  return (
    <Fragment>
      <SettingButton onClick={handleOpen}>
        <AdUnitsIcon />
      </SettingButton>
      <Drawer
        open={open}
        anchor="right"
        onClose={handleClose}
        sx={{zIndex: 9999}}
      >
        <Box width="350px" px={2} py={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="subtitle2">Ad History Debug</Typography>
            <IconButton size="small" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <AdHistoryList />
        </Box>
      </Drawer>
    </Fragment>
  );
};

export default AdDebugDrawer;
