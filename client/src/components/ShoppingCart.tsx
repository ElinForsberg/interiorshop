import  { useState } from 'react';
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import { ShoppingCartItem } from '../redux/slices/shoppingCartSlice';
import { RootState } from '../redux/store';
import { Button } from '@mui/material';
import { useCreateCheckoutSessionMutation } from '../redux/services/checkoutApi';



function ShoppingCart() {
  
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const shoppingCart = useSelector((state: RootState) => state.shoppingCart);

  const cartItems = shoppingCart.cartItems;

  const [createCheckoutSession] = useCreateCheckoutSessionMutation();


  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handlePayment = async () => {
    try {
      const result = await createCheckoutSession(cartItems);
      
      if ('data' in result) {
        const { url, sessionId } = result.data;
        localStorage.setItem('session-id', sessionId);
        window.location.href = url; 
      } else {
        // Handle the case where data is undefined (optional)
      }
    } catch (error) {
      console.error('Error during handlePayment:', error);
      // Handle the error as needed
    }
  };
  
// const handlePayment = async () => {
//     const response = await fetch(
//         "http://localhost:3000/api/create-checkout-session", 
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           credentials: 'include',
//           body: JSON.stringify(cartItems),
          
//         }
//         );
//         if (!response.ok) {
//             return;
//           }
//         const { url, sessionId } = await response.json();
//         localStorage.setItem("session-id", sessionId);
//         window.location = url;
        
// }


  return (
    <div>
      <IconButton onClick={handleDrawerOpen}>
        <ShoppingCartIcon />
      </IconButton>

      <Drawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        <List>
          { cartItems.map((item: ShoppingCartItem ) => (
          <ListItem key={item.id}>
            <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
            {item.name}
            pris: {item.price}
          </ListItem>
          ))}
          {/* Add more ListItems as needed */}
        </List>
        <Button onClick={handlePayment}>Betala</Button>
      </Drawer>
    </div>
  );
}

export default ShoppingCart;
