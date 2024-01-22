import  { useMemo, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import { ShoppingCartItem, ShoppingCartState } from '../redux/slices/shoppingCartSlice';
import { Badge, Button } from '@mui/material';
import { useCreateCheckoutSessionMutation } from '../redux/services/checkoutApi';
import { useAppSelector } from '../redux/hooks';
import { styled } from '@mui/system';



function ShoppingCart() {
  
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const shoppingCart = useAppSelector<ShoppingCartState>((state) => state.shoppingCart);

  const cartItems = shoppingCart.cartItems;

  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

console.log(shoppingCart.cartItems);

const totalItems = useMemo(() => {
  return cartItems.reduce((sum, item) => sum + item.quantity, 0);
}, [cartItems]);

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
        <StyledBadge badgeContent={totalItems} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>

      <Drawer
        anchor="right"
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

const StyledBadge = styled(Badge)(({theme}) => ({
  color: theme.palette.primary.main,
}))

export default ShoppingCart;
