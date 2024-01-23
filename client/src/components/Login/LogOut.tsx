import { Button } from "@mui/material";
import { useLogoutUserMutation } from "../../redux/services/usersApi";
import { useDispatch } from "react-redux";
import {  isLoggedIn, logoutUser, selectUser } from "../../redux/slices/userSlice";
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { ordersApi } from "../../redux/services/ordersApi";
import { StyledLink } from "../../Theme";


function LogOut() {
    const [logoutUserMutation] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const user = useAppSelector(selectUser);
    const LoggedIn = useAppSelector(isLoggedIn);
    
  
    const handleLogout = async () => {
        try {
          await logoutUserMutation();
          dispatch(logoutUser());
          ordersApi.util.resetApiState();
          console.log('User successfully logged out!');
        } catch (error) {
          console.error('User logout failed:', error);
        }
      };

  return (
    <div>
      {LoggedIn ? (
        <>
        <StyledForm>
        <h2>Välkommen, {user?.name}!</h2>
          
          <StyledButton type="submit" variant="contained">
          <StyledLink to={'/mypage'}>
            Mina Sidor
            </StyledLink>
          </StyledButton>
          
          <LogoutButton type="submit" variant="contained" onClick={handleLogout}>
          <StyledLink to={'/'}>
            Logout
            </StyledLink>
          </LogoutButton>
          
        </StyledForm>
          
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  )
}
const StyledForm = styled.form`
display: flex;
flex-direction: column;
padding: 5px;
margin-top: 1rem;
`;
const StyledButton = styled(Button)`
margin-top: 4rem;
margin-bottom: 6px;
background-color: lightgray;
`
const LogoutButton = styled(Button)`
margin-bottom: 6px;
background-color: black;
`
export default LogOut