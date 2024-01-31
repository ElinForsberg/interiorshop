import { Button } from "@mui/material";
import { useLogoutUserMutation } from "../../redux/services/usersApi";
import { useDispatch } from "react-redux";
import {  isLoggedIn, logoutUser, selectUser } from "../../redux/slices/userSlice";
import { useAppSelector } from "../../redux/hooks";
import styled from "@emotion/styled";
import { ordersApi } from "../../redux/services/ordersApi";
import { useNavigate } from 'react-router-dom';

interface LogoutProps {
  handleClose: () => void;
}
//function for logout user and also link to mypages for logged in users
function LogOut({ handleClose }: LogoutProps) {
    const [logoutUserMutation] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const user = useAppSelector(selectUser);
    const LoggedIn = useAppSelector(isLoggedIn);
    const navigate = useNavigate();
    
  //Logout user and redirect to homepage
    const handleLogout = async () => {
      navigate('/');
        try {
          await logoutUserMutation();
          dispatch(logoutUser());   
          ordersApi.util.resetApiState();  
        } catch (error) {
          console.error('User logout failed:', error);
        }
      };
      const handleGoToMyPages = () => {
          handleClose();
          navigate('/mypage');
      }

  return (
    <div>
      {LoggedIn ? (
        <>
        <StyledForm>
        <h2>Välkommen, {user?.name}!</h2>      
          <StyledButton type="submit" onClick={handleGoToMyPages}variant="contained">
            Mina Sidor
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