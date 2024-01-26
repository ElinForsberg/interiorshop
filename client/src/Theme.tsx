import { createTheme } from '@mui/material/styles';
import styled from '@emotion/styled'
import { Link } from 'react-router-dom';


  
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
      dark: '#747474',
    
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  
});


export const StyledLink = styled(Link)`
 text-decoration: none;  
  color: inherit; 
  &:hover {
    text-decoration: none;  
    color: inherit;  
  }
`

export default theme;