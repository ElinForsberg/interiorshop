// import { UserState } from '../../redux/slices/userSlice';
import LoginUserForm from './LoginUserForm'
import RegisterUserForm from './RegisterUserForm'
// import { useAppSelector } from '../../redux/hooks';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import {  Dialog, IconButton, Tab, Tabs } from '@mui/material';
import { SetStateAction, useState } from 'react';
import styled from '@emotion/styled';




function Login() {
  // const userState = useAppSelector<UserState>((state) => state.user);
  // const { isLoggedIn } = userState;
  // const { user } = userState;
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
    const handleClose = () => {
      setOpen(false)
    };
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event: unknown, newValue: SetStateAction<number>) => {
      setActiveTab(newValue);
    };

  return (  
      <div>
      <IconButton onClick={handleClickOpen}>
        <AccountCircleSharpIcon />
      </IconButton>
      <StyledDialog onClose={handleClose} open={open}>
        <FormContainer>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Logga in" />
          <Tab label="Skapa konto" />
        </Tabs>
        {activeTab === 0 && <LoginUserForm />}
        {activeTab === 1 && <RegisterUserForm />}
        </FormContainer>
      
       </StyledDialog>    
    </div>
  );
}
const StyledDialog = styled(Dialog)`
  
`;
const FormContainer = styled.div`
/* min-height: 500px; */
min-width: 300px;
`
export default Login


