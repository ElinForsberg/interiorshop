import styled from '@emotion/styled';
import ShoppingCart from './ShoppingCart';
import { Box, Grid,  Typography } from '@mui/material';
import LoginDialog from './Login/LoginDialog';
import { useAppSelector } from '../redux/hooks';
import { selectUser } from '../redux/slices/userSlice';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { StyledLink } from '../Theme';
import { useMediaQuery } from '@mui/material';


function Header() {
  const user = useAppSelector(selectUser);
  const isAdmin = user?.isAdmin;
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <>
    {isSmallScreen ? (
      
    <StyledBox>
      <div>
      <StyledLink to={'/'}>
            <Typography variant="h2">
              TrendigaRum
            </Typography>
          </StyledLink>
      </div>
      <SmallscreenContainer>
      {isAdmin ? (
          <StyledLink to={'/adminpanel'}>           
            <AdminPanelSettingsIcon/>
          </StyledLink>
        ) : <></>}
          <LoginDialog />
          <ShoppingCart />
      </SmallscreenContainer>
    </StyledBox>
    ):(
      <StyledBox>
      <HeaderContainer container direction="row">
        <Grid item xs="auto">
          <StyledLink to={'/'}>
            <Typography variant="h2">
              TrendigaRum
            </Typography>
          </StyledLink>
        </Grid>
        <HeaderContainer container direction="row" xs="auto">
        {isAdmin ? (
          <StyledLink to={'/adminpanel'}>           
            <AdminPanelSettingsIcon/>
          </StyledLink>
        ) : <></>}
          <LoginDialog />
          <ShoppingCart />
        </HeaderContainer>

      </HeaderContainer>
    </StyledBox>
    )
    }
    </>
  );
}
const StyledBox = styled(Box)`
height: 110px;
width: 100%;
background-color: white;
position: fixed; 
z-index: 2; 
padding-left: 5px;
padding-right: 5px;
`;
const HeaderContainer = styled(Grid)`
  height: 100px;
  justify-content: space-between;
  align-items: center;
`;
const SmallscreenContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  gap: 4px; 
  padding: 10px;
`;
export default Header;
