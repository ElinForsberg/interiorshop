import { UserState } from '../../redux/slices/userSlice';
import LoginUserForm from './LoginUserForm'
import RegisterUserForm from './RegisterUserForm'
import { useAppSelector } from '../../redux/hooks';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import {  Dialog, IconButton, Tab, Tabs } from '@mui/material';
import { SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import LogOut from './LogOut';


//Dialog component to login, register, logout and link to mypage
function Login() {
  const userState = useAppSelector<UserState>((state) => state.user);
  const { isLoggedIn } = userState;
  
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
    const handleClose = () => {
      setOpen(false)
    };
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (_event: unknown, newValue: SetStateAction<number>) => {
      setActiveTab(newValue);
    };

  return (  
      <div>
      <IconButton onClick={handleClickOpen}>
        <AccountCircleSharpIcon />
      </IconButton>
      <Dialog onClose={handleClose} open={open}>
        <FormContainer>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          { isLoggedIn?
            <Tab label="Mina sidor" /> :
            <Tab label="Logga in" /> 
          }        
          <Tab label="Skapa konto" />
        </Tabs>
        { isLoggedIn ?            
              activeTab === 0 && <LogOut handleClose={handleClose} />  :
              activeTab === 0 && <LoginUserForm />}
        {activeTab === 1 && <RegisterUserForm />}
        </FormContainer>
       </Dialog>    
    </div>
  );
}

const FormContainer = styled.div`
min-width: 300px;
`;
export default Login


