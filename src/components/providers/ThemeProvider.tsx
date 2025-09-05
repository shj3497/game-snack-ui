import {CssBaseline, ThemeProvider as MuiThemeProvider} from '@mui/material';
import {theme} from '@/lib/theme';
import {FC} from 'react';

interface Props {
  children: React.ReactNode;
}

const ThemeProvider: FC<Props> = ({children}) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
export default ThemeProvider;
