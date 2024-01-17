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

function ShoppingCart() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const shoppingCart = useSelector((state: RootState) => state.shoppingCart);

  const cartItems = shoppingCart.cartItems;

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

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
        <Button>Betala</Button>
      </Drawer>
    </div>
  );
}

export default ShoppingCart;
