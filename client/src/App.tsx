import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home/HomePage'
import ProductPage from './pages/ProductPage/ProductPage'

import ConfirmationPage from './pages/Confirmation/ConfirmationPage'
import MyPage from './pages/MyPage/MyPage'
import AdminPage from './pages/AdminPage/AdminPage'


import { useDispatch } from 'react-redux'

import { useAuthorizeQuery } from './redux/services/usersApi'
import { useEffect } from 'react'
import { loginUser } from './redux/slices/userSlice'
import { ThemeProvider } from '@mui/material/styles'
import theme from './Theme'

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
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/products/:id" element={<ProductPage/>}/> 
      <Route path="/confirmation" element={<ConfirmationPage/>}/> 
      <Route path="/mypage" element={<MyPage/>}/>
      <Route path="/adminpanel" element={<AdminPage/>}/>
    </Routes>
   </BrowserRouter>
    </ThemeProvider>
  
  )
}

export default App
