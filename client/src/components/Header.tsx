import styled from '@emotion/styled';
import ShoppingCart from './ShoppingCart';
import { Box, Grid,  Typography, useMediaQuery } from '@mui/material';
import LoginDialog from './Login/LoginDialog';
import { useAppSelector } from '../redux/hooks';
import { selectUser } from '../redux/slices/userSlice';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { StyledLink } from '../Theme';


function Header() {
  const user = useAppSelector(selectUser);
  const isAdmin = user?.isAdmin;
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <>
    {isSmallScreen ? (
      
    <StyledBox>
      <StyledBanner>
        <Typography variant="body2" color="white">Registrera dig hos oss och få rabattkod!!</Typography>
      </StyledBanner>
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
        <StyledBanner>
        <Typography variant="body2" color="white">Registrera dig som kund hos oss och få 10% på ett köp!!</Typography>
        </StyledBanner>
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
height: 150px;
width: 100%;
background-color: white;
position: fixed; 
z-index: 2; 
box-shadow: 0px 25px 16px -30px rgba(0,0,0,0.45);
`;
const HeaderContainer = styled(Grid)`
  height: 100px;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px;
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
const StyledBanner = styled.div`
  height: 28px;
  background-color: black;
  text-align: center;
  padding-top: 2px;
`;
export default Header;
