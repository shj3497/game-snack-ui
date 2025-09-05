import {
  Box,
  Button,
  Dialog,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  styled,
} from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import {FC, Fragment, useState} from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import useUserInfoConfig from '@/lib/store/user-info-config/useUserInfoConfig';
import DebugUpdateForm from './DebugUpdateForm';
import {UserInfo} from '@/lib/store/user-info-config/type';

interface Props {}

const SettingButton = styled(IconButton)`
  position: fixed;
  z-index: 8888;
  top: 16px;
  left: 16px;
  border: 1px solid ${({theme}) => theme.palette.game_mint.main};
  color: ${({theme}) => theme.palette.game_mint.main};
`;

const StyledListItem = styled(ListItem)`
  padding: 0;
`;

const DebugDrawer: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [updateInfo, setUpdateInfo] = useState<keyof UserInfo>('pid');
  const userInfo = useUserInfoConfig();

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateOpen = (updateInfo: keyof UserInfo) => {
    setUpdateInfo(updateInfo);
    setUpdateDialogOpen(true);
  };

  const handleUpdatePid = (value: string) => {
    userInfo.updatePid(value);
  };

  const handleUpdateClickKey = (value: string) => {
    userInfo.updateClickKey(value);
  };

  const handleUpdateUserId = (value: string) => {
    userInfo.updateUserId(value);
  };

  const handleUpdatePlatform = (value: string) => {
    userInfo.updatePlatform(value as UserInfo['platform']);
  };

  const handleUpdateAdid = (value: string) => {
    userInfo.updateAdid(value);
  };

  const handleUpdateIdfa = (value: string) => {
    userInfo.updateIdfa(value);
  };

  const handleUpdateEnvironment = (value: string) => {
    userInfo.updateEnvironment(value);
  };

  const onSubmit = (key: keyof UserInfo, value: string) => {
    if (key === 'pid') {
      handleUpdatePid(value);
    } else if (key === 'clickKey') {
      handleUpdateClickKey(value);
    } else if (key === 'userId') {
      handleUpdateUserId(value);
    } else if (key === 'adid') {
      handleUpdateAdid(value);
    } else if (key === 'platform') {
      if (['IOS', 'ANDROID'].includes(value)) {
        handleUpdatePlatform(value);
      }
    } else if (key === 'idfa') {
      handleUpdateIdfa(value);
    } else if (key === 'environment') {
      if (['development', 'test', 'production'].includes(value)) {
        handleUpdateEnvironment(value);
      }
    }
    setUpdateDialogOpen(false);
  };

  return (
    <Fragment>
      <SettingButton onClick={handleClick}>
        <BugReportIcon />
      </SettingButton>

      <Dialog
        open={updateDialogOpen}
        onClose={() => {
          setUpdateDialogOpen(false);
        }}
        sx={{zIndex: 10000}}
      >
        <DebugUpdateForm
          name={updateInfo}
          defaultValue={userInfo[updateInfo]}
          onSubmit={onSubmit}
        />
      </Dialog>

      <Drawer
        open={open}
        anchor="left"
        onClose={handleClose}
        sx={{zIndex: 9999}}
      >
        <Box width="280px">
          <List subheader={<ListSubheader>Debug Info</ListSubheader>}>
            <StyledListItem>
              <ListItemButton onClick={() => handleUpdateOpen('pid')}>
                <ListItemText primary="pid" secondary={userInfo.pid} />
              </ListItemButton>
            </StyledListItem>

            <StyledListItem>
              <ListItemButton onClick={() => handleUpdateOpen('clickKey')}>
                <ListItemText
                  primary="clickKey"
                  secondary={userInfo.clickKey}
                />
              </ListItemButton>
            </StyledListItem>

            <StyledListItem>
              <ListItemButton onClick={() => handleUpdateOpen('userId')}>
                <ListItemText primary="userId" secondary={userInfo.userId} />
              </ListItemButton>
            </StyledListItem>

            <StyledListItem>
              <ListItemButton onClick={() => handleUpdateOpen('platform')}>
                <ListItemText
                  primary="platform"
                  secondary={userInfo.platform}
                />
              </ListItemButton>
            </StyledListItem>

            <StyledListItem>
              <ListItemButton onClick={() => handleUpdateOpen('adid')}>
                <ListItemText primary="adid" secondary={userInfo.adid} />
              </ListItemButton>
            </StyledListItem>

            <StyledListItem>
              <ListItemButton onClick={() => handleUpdateOpen('idfa')}>
                <ListItemText primary="idfa" secondary={userInfo.idfa} />
              </ListItemButton>
            </StyledListItem>

            <StyledListItem>
              <ListItemButton onClick={() => handleUpdateOpen('environment')}>
                <ListItemText
                  primary="environment"
                  secondary={userInfo.environment}
                />
              </ListItemButton>
            </StyledListItem>

            <StyledListItem>
              <ListItemButton disableRipple>
                <Button
                  fullWidth
                  onClick={() => window.location.reload()}
                  endIcon={<RefreshIcon />}
                  sx={{textTransform: 'none'}}
                >
                  Router Refesh
                </Button>
              </ListItemButton>
            </StyledListItem>
          </List>
        </Box>
      </Drawer>
    </Fragment>
  );
};
export default DebugDrawer;
