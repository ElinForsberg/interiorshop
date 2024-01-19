import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Controller, useForm } from "react-hook-form"
import { LoginUser, User,  useLoginUserMutation} from "../../redux/services/usersApi";
// import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/userSlice";
import styled from "@emotion/styled";
import { useAppDispatch } from "../../redux/hooks";



function LoginUserForm() {
  const dispatch = useAppDispatch();
    const [loginUserMutation, { isLoading }] = useLoginUserMutation();
    

   
    
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


