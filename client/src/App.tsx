import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home/HomePage'
import ProductPage from './pages/ProductPage/ProductPage'
import Login from './pages/Login/LoginPage'

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/products" element={<HomePage/>}/>
      <Route path="/products/:id" element={<ProductPage/>}/> 
      <Route path="/login" element={<Login/>}/> 
    </Routes>
   </BrowserRouter>
  )
}

export default App
