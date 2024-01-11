import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { useRegisterUserMutation, RegisterUser } from '../../redux/services/usersApi';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => <TextField id="name" label="Name" variant="standard" {...field} />}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => <TextField id="email" label="Email" variant="standard" {...field} />}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => <TextField id="password" label="Password" type="password" variant="standard" {...field} />}
      />
      <Button type="submit" variant="contained" disabled={isLoading}>
        Register
      </Button>
      
    </form>
  );
}

export default RegisterUserForm;