import {  Route, Routes } from "react-router-dom"
import AdminPage from "./pages/AdminPage/AdminPage"
import ConfirmationPage from "./pages/Confirmation/ConfirmationPage"
import HomePage from "./pages/Home/HomePage"
import MyPage from "./pages/MyPage/MyPage"
import ProductPage from "./pages/ProductPage/ProductPage"
import MissingPage from "./pages/MissingPage/MissingPage"
import UnauthorizedPage from "./pages/UnauthorizedPage/UnauthorizedPage"


function Router() {

  return (
   
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/products/:id" element={<ProductPage/>}/> 
        <Route path="/confirmation" element={<ConfirmationPage/>}/> 
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/adminpanel" element={<AdminPage/>}/>
        <Route path="/401" element={<UnauthorizedPage/>}/>
        <Route path="*" element={<MissingPage/>}/>
      </Routes>
    
  )
}

export default Router