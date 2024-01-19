import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home/HomePage'
import ProductPage from './pages/ProductPage/ProductPage'

import ConfirmationPage from './pages/Confirmation/ConfirmationPage'

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/products" element={<HomePage/>}/>
      <Route path="/products/:id" element={<ProductPage/>}/> 
      
      <Route path="/confirmation" element={<ConfirmationPage/>}/> 
    </Routes>
   </BrowserRouter>
  )
}

export default App
