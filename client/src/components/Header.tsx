
import styled from '@emotion/styled';
import ShoppingCart from './ShoppingCart';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@mui/material';

function Header() {
  return (
    <Box>
        <HeaderContainer container direction="row">
            <Grid item xs={10}><Link to={'/products'}>InteriorShop</Link></Grid>     
            <Grid item xs={1}><Link to={'/login'}>Logga in</Link></Grid>    
            <Grid item xs={1}><ShoppingCart/></Grid>    
        </HeaderContainer>
    </Box>
    
    
  )
}
const HeaderContainer = styled(Grid)`
  background-color: lightgrey;
  height: 100px;
  justify-content: space-between;
  align-items: center;
`;


export default Header