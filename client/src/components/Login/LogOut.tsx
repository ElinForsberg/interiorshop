import { Button } from "@mui/material";
import { useLogoutUserMutation } from "../../redux/services/usersApi";
import { useDispatch } from "react-redux";
import { UserState, logoutUser } from "../../redux/slices/userSlice";
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";


function LogOut() {
    const [logoutUserMutation] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const userState = useAppSelector<UserState>((state) => state.user);
    const { user, isLoggedIn } = userState;
    
    console.log(user?.name);
    console.log(isLoggedIn);
    
    
    
   

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
      {isLoggedIn ? (
        <>
          <h2>Välkommen, {user?.name}!</h2>
          <Link to={'/mypage'}>
          <Button type="submit" variant="contained">
            Mina Sidor
          </Button>
          </Link>
         
          <Button type="submit" variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  )
}

export default LogOut