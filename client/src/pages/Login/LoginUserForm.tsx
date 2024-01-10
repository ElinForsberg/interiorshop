import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Controller, useForm } from "react-hook-form"
import { LoginUser, useLoginUserMutation, useLogoutUserMutation } from "../../services/users";


function LoginUserForm() {
    const [loginUserMutation, { isLoading,  data }] = useLoginUserMutation();
    const [logoutUserMutation] = useLogoutUserMutation();
    const { control, handleSubmit } = useForm<LoginUser>({
        defaultValues: {       
          email: '',
          password: ''
        }
      });

      const onSubmit = async (formData: LoginUser) => {
        try {
          await loginUserMutation(formData);
          // Handle successful user registration
          console.log('User successfully logged in!', data?.name);
        } catch (error) {
          // Handle registration error
          console.error('User login failed:', error);
        }
      };

      const handleLogout = async () => {
        try {
          await logoutUserMutation();
          console.log('User successfully logged out!');
        } catch (error) {
          console.error('User logout failed:', error);
        }
      };
  return (
    <>
     <div>Login</div>
     <form onSubmit={handleSubmit(onSubmit)}>
      
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
        Login
      </Button>
      
    </form>
    <div>
        <p>logout</p>
        <Button type="submit" variant="contained" onClick={handleLogout}>Logout</Button>
        </div>
    </>
   
  )
}

export default LoginUserForm