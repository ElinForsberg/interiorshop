import  { useMemo, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import { ShoppingCartItem, ShoppingCartState } from '../redux/slices/shoppingCartSlice';
import { Badge, Button, Typography } from '@mui/material';
import { useCreateCheckoutSessionMutation } from '../redux/services/checkoutApi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearCart } from '../redux/slices/shoppingCartSlice';
import HandleCart from './HandleCart';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';


function ShoppingCart() {
  
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const shoppingCart = useAppSelector<ShoppingCartState>((state) => state.shoppingCart);

  const cartItems = shoppingCart.cartItems;

  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const dispatch = useAppDispatch();



const totalItems = useMemo(() => {
  return cartItems.reduce((sum, item) => sum + item.quantity, 0);
}, [cartItems]);

const totalPrice = useMemo(() => {
  return cartItems.reduce((sum, item) => {
    const numericPrice = parseFloat(item.price.replace(/[^\d.,]/g, '').replace(',', '.')); // Parse numeric price
    return sum + numericPrice * item.quantity;
  }, 0).toFixed(2);
}, [cartItems]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const emptyCart = () => {
    dispatch(clearCart());
}


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
        <IconButton onClick={handleDrawerClose}>
        <CloseIcon/>
        </IconButton>
        
        {cartItems.length > 0 ? (
            <>
        <StyledList>
        
          <StyledContainer>
            <Typography variant='h4'>Varukorg</Typography>
          </StyledContainer>
          { cartItems.map((item: ShoppingCartItem ) => (
          <ListItem key={item.id}>
            <ImgContainer>
            <StyledImg src={item.image} alt={item.name} />
            </ImgContainer>
            
            <TextContainer>
            <Typography>{item.name}</Typography>
            <Typography> á pris: {item.price}</Typography>
            </TextContainer>
           
            
           <HandleCart stripeProduct={{
                id: item.id,
                active: false,
                created: 0,
                default_price: {
                  id: '',
                  active: false,
                  currency: item.currency,
                  product: item.product,
                  unit_amount: 0,
                  unit_amount_decimal: 0
                },
                description: '',
                images: item.image,
                metadata: {
                  category: ''
                },
                name: ''
              }} quantity={item.quantity}/>
          </ListItem>
          ))}
          {/* Add more ListItems as needed */}
          <StyledContainer>
            <Typography variant='h5'>Totalt: {totalPrice} kr</Typography>
          </StyledContainer>
          </StyledList>
        <StyledBtn variant="contained" onClick={handlePayment}>Betala</StyledBtn>
        <StyledBtn variant="outlined" onClick={emptyCart}>Töm varukorgen</StyledBtn>
        </>
        ) : (
          <EmptyCartContainer>
            <Typography variant="h5">Din varukorg är tom</Typography>
            <BackBtn variant="outlined" onClick={handleDrawerClose}>Fortsätt handla</BackBtn>
          </EmptyCartContainer>
          
        )}
        
      </Drawer>
    </div>
  );
}

const StyledBadge = styled(Badge)(({theme}) => ({
  color: theme.palette.primary.main,
}))

const StyledList = styled(List)`
padding:8px;
`
const StyledBtn = styled(Button)`
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 5px;
`
const TextContainer = styled.div`
display: flex;
flex-direction: column;
padding: 1.5rem;
`
const ImgContainer = styled.div`
height: 100px;
width: 100px;
`
const StyledImg = styled.img`
  object-fit: cover;
   width: 100%;
  height: 100%;
`
const StyledContainer = styled(ListItem)`
display: flex;
justify-content: center;
align-items: center;
`
const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`
const BackBtn = styled(Button)`
margin-top: 2rem;
`
export default ShoppingCart;
