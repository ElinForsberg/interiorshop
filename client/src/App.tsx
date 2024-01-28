
import './App.css'
import { useDispatch } from 'react-redux';
import { useAuthorizeQuery } from './redux/services/usersApi';
import { useEffect } from 'react';
import { loginUser } from './redux/slices/userSlice';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme';
import Router from './Router';
import Header from './components/Header';
import Footer from './components/Footer';



function App() {
  const dispatch = useDispatch();
  
   const { data, error } = useAuthorizeQuery();

  useEffect(() => {
    if (data) {
      console.log(data);
      dispatch(loginUser(data));
    } else if (error) {
      console.error(error);
    }
  }, [data, error, dispatch]);


  return (
    <ThemeProvider theme={theme}>
     <Header/>
      <Router/>
      <Footer/>
    </ThemeProvider>
  
  )
}

export default App
