import { useDispatch } from "react-redux";
import { StripeProduct } from "../redux/services/productsApi";
import { addToCart, removeFromCart } from "../redux/slices/shoppingCartSlice";
import { ButtonGroup, Button } from "@mui/material";

export type  HandleCartProps = {
    stripeProduct: StripeProduct;
  }

const HandleCart: React.FC<HandleCartProps> = ({stripeProduct}) => {
       
const dispatch = useDispatch();
const formattedPrice = new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 2,
  }).format(stripeProduct.default_price.unit_amount_decimal / 100);

const handleAddToCart = () => {
    
    dispatch(addToCart({
        id: stripeProduct.id, 
        name: stripeProduct.name, 
        price: formattedPrice, 
        image: stripeProduct.images, 
        quantity: 1,
        product: stripeProduct.default_price.id,
        currency: stripeProduct.default_price.currency
    }));   
  };

  const handleRemoveFromCart = () => {
    
    dispatch(removeFromCart(stripeProduct.id));
  };
  return (
    <div>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button onClick={handleRemoveFromCart}> - </Button>
            <Button onClick={handleAddToCart}> + </Button>
        </ButtonGroup>
    </div>
  )
}

export default HandleCart