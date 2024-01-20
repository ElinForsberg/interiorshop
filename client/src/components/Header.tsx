import styled from '@emotion/styled';
import ShoppingCart from './ShoppingCart';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import LoginDialog from './Login/LoginDialog';
import { useAppSelector } from '../redux/hooks';
import { selectUser } from '../redux/slices/userSlice';

function Header() {
  const user = useAppSelector(selectUser);
  const isAdmin = user?.isAdmin;

  return (
    <Box>
      <HeaderContainer container direction="row">
        <Grid item xs={9}>
          <Link to={'/'}>interiorshop</Link>
        </Grid>
        {isAdmin ? (
          <Link to={'/adminpanel'}>
            <Grid item xs={1}>
              Admin Panel
            </Grid>
          </Link>
        ) : <></>}
        <Grid item xs={1}>
          <LoginDialog />
        </Grid>
        <Grid item xs={1}>
          <ShoppingCart />
        </Grid>
      </HeaderContainer>
    </Box>
  );
}

const HeaderContainer = styled(Grid)`
  background-color: lightgrey;
  height: 100px;
  justify-content: space-between;
  align-items: center;
`;

export default Header;
