import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#444444',
      dark: '#0A0708',
      light:  '#B1B1B1'
    },
    secondary: {
        main: '#00897b',
      light: '#4db6ac',
      dark: '#747474'
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;