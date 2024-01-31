import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography } from '@mui/material';
import { useRegisterUserMutation, RegisterUser } from '../../redux/services/usersApi';
import styled from '@emotion/styled';
import { useState } from 'react';

//Form for register new user, form from react-hook-form with validation
function RegisterUserForm() {
  const [registrationStatus, setRegistrationStatus] = useState<'success' | 'error' | null>(null);
  
  const [registerUserMutation, { isLoading }] = useRegisterUserMutation();
  const { control, handleSubmit, formState, reset } = useForm<RegisterUser>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });
  const { errors } = formState;


  const onSubmit = async (formData: RegisterUser) => {
    try {
     const response =  await registerUserMutation(formData);
      if ('data' in response) {
        setRegistrationStatus('success');
        reset();
      } else if ('error' in response && Response.json(409)) {
        setRegistrationStatus('error');
      }     
    } catch (error) {
      console.error('User registration failed:', error);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      {registrationStatus === 'success' && (
        <StyledContainer>
          <Typography variant="body2" >
              Du har nu registrerat dig som användare och kan logga in!
          </Typography>
          <Typography variant="body1">Med NY10 får du 10% på ett helt köp</Typography>
        </StyledContainer>
       
      )}
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Namn är obligatoriskt' }}
        render={({ field }) => <TextField id="name" label="Namn" variant="standard"  {...field} />}
      />
      <Typography variant="caption" color="error">{errors.name?.message}</Typography>
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
      {registrationStatus === 'error' && (
        <Typography variant="caption" color="error">
          Email adressen finns redan, välj en annan email.
        </Typography>
      )}
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
      
      <StyledButton type="submit" variant="contained" disabled={isLoading}>
        Registrera
      </StyledButton>
      
    </StyledForm>
  );
}
const StyledForm = styled.form`
display: flex;
flex-direction: column;
padding: 5px;
margin-top: 1rem;
`;

const StyledContainer = styled.div`
  width: 270px;
`

const StyledButton = styled(Button)`
margin-top: 4rem;
margin-bottom: 6px;
background-color: black;
`
export default RegisterUserForm;