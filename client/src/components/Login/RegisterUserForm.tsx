import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { useRegisterUserMutation, RegisterUser } from '../../redux/services/usersApi';
import styled from '@emotion/styled';

function RegisterUserForm() {
  
  const [registerUserMutation, { isLoading,  data }] = useRegisterUserMutation();
  const { control, handleSubmit } = useForm<RegisterUser>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });
  const onSubmit = async (formData: RegisterUser) => {
    try {
      await registerUserMutation(formData);
      // Handle successful user registration
      console.log('User registered successfully!', data);
    } catch (error) {
      // Handle registration error
      console.error('User registration failed:', error);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => <TextField id="name" label="Namn" variant="standard" {...field} />}
      />
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

const StyledButton = styled(Button)`
margin-top: 4rem;
margin-bottom: 6px;
background-color: black;
`
export default RegisterUserForm;