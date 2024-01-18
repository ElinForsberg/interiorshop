import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Controller, useForm } from "react-hook-form"
import { LoginUser, User, useLoginUserMutation, useLogoutUserMutation } from "../../redux/services/usersApi";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../../redux/slices/userSlice";
import styled from "@emotion/styled";


function LoginUserForm() {
  const dispatch = useDispatch();
    const [loginUserMutation, { isLoading }] = useLoginUserMutation();
    // const [logoutUserMutation] = useLogoutUserMutation();
    const { control, handleSubmit } = useForm<LoginUser>({
        defaultValues: {       
          email: '',
          password: ''
        }
      });

      const handleLogin = async (formData: LoginUser) => {
        try {
          const response = await loginUserMutation(formData);
          if('data' in response){
            const userData = response.data as User;
            console.log('User successfully logged in!');
            console.log(userData);
            dispatch(loginUser(userData))
          }
        } catch (error) {
          // Handle registration error
          console.error('User login failed:', error);
        }
      };

      // const handleLogout = async () => {
      //   try {
      //     await logoutUserMutation();
      //     dispatch(logoutUser());
      //     console.log('User successfully logged out!');
      //   } catch (error) {
      //     console.error('User logout failed:', error);
      //   }
      // };
  return (
    <>
     
     <StyledForm onSubmit={handleSubmit(handleLogin)}>
      
      <Controller
        name="email"
        control={control}
        render={({ field }) => <TextField id="email" label="Email" variant="standard" {...field} />}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => <TextField id="password" label="Lösenord" type="password" variant="standard" {...field} />}
      />
      <StyledButton type="submit" variant="contained" disabled={isLoading}>
        Login
      </StyledButton>
      
    </StyledForm>
    <div>
        
        {/* <Button type="submit" variant="contained" onClick={handleLogout}>Logout</Button> */}
     </div>
    </>
   
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
background-color: black;
`

export default LoginUserForm