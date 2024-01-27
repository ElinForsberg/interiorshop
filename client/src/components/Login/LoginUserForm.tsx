import { Controller, useForm } from "react-hook-form"
import { LoginUser, User,  useLoginUserMutation} from "../../redux/services/usersApi";
import { loginUser } from "../../redux/slices/userSlice";
import styled from "@emotion/styled";
import { useAppDispatch } from "../../redux/hooks";
import { useGetPersonalOrdersQuery } from "../../redux/services/ordersApi";
import { Typography, Button, TextField } from "@mui/material";
import { useState } from "react";



function LoginUserForm() {
  const [registrationStatus, setRegistrationStatus] = useState<'success' | 'error' | null>(null);
  const dispatch = useAppDispatch();
    const [loginUserMutation, { isLoading }] = useLoginUserMutation();
    const { refetch: refetchOrders } = useGetPersonalOrdersQuery();   

   
    
    const { control, handleSubmit, formState, reset } = useForm<LoginUser>({
        defaultValues: {       
          email: '',
          password: ''
        }
      });

      const { errors } = formState;

      const handleLogin = async (formData: LoginUser) => {
        try {
          const response = await loginUserMutation(formData);
          if('data' in response){
            const userData = response.data as User;
            console.log('User successfully logged in!');
            console.log("från login", userData);
            dispatch(loginUser(userData))
            setRegistrationStatus('success');
            reset();
            refetchOrders();
          } else if ('error' in response && Response.json(401)) {
            setRegistrationStatus('error');
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
        rules={{
          required: 'Email är obligatoriskt',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Ogiltig email-adress',
          },
        }}
        render={({ field }) => <TextField id="email" label="Email" variant="standard" {...field} />}
      />
       <Typography variant="caption" color="error">{errors.email?.message}</Typography>
     <Controller
        name="password"
        control={control}
        rules={{
          required: true,
          pattern: {
            value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&?*])(?=.{8,})/,
            message: 'Lösenordet måste vara minst 8 tecken långt, innehålla minst en stor bokstav, en siffra och ett specialtecken',
          },
        }}
        render={({ field }) => <TextField id="password" label="Lösenord" type="password" variant="standard" {...field} />}
      />
      <StyledContainer>
      <Typography variant="caption" color="error">{errors.password?.message}</Typography>
      </StyledContainer>
      <Typography variant="caption" color="error">{errors.email?.message}</Typography>
      {registrationStatus === 'error' && (
        <Typography variant="caption" color="error">
          Fel användarnamn eller lösenord.
        </Typography>
      )}
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
`;
const StyledContainer = styled.div`
  width: 270px;
`;

export default LoginUserForm


