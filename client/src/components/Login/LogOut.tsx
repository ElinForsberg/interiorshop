import { Button } from "@mui/material";
import { useLogoutUserMutation } from "../../redux/services/usersApi";
import { useDispatch } from "react-redux";
import {  isLoggedIn, logoutUser, selectUser } from "../../redux/slices/userSlice";
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";


function LogOut() {
    const [logoutUserMutation] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const user = useAppSelector(selectUser);
    const LoggedIn = useAppSelector(isLoggedIn);
    
   

    const handleLogout = async () => {
        try {
          await logoutUserMutation();
          dispatch(logoutUser());
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
          <Link to={'/mypage'}>
            Mina Sidor
            </Link>
          </StyledButton>
          <LogoutButton type="submit" variant="contained" onClick={handleLogout}>
            Logout
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