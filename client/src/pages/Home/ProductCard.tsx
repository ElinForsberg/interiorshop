import React from 'react'
import { ProductInStock, StripeProduct } from '../../redux/services/productsApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, ButtonGroup, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/slices/shoppingCartSlice';


interface ProductCardProps {
    stripeProduct: StripeProduct;
    productInStock: ProductInStock["inStock"];
  }

  const ProductCard: React.FC<ProductCardProps> = ({ stripeProduct, productInStock }) => {
    // Render your product details using the 'product' prop
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    
    const formattedPrice = new Intl.NumberFormat('sv-SE', {
        style: 'currency',
        currency: 'SEK',
        minimumFractionDigits: 2,
      }).format(stripeProduct.default_price.unit_amount_decimal / 100);

    const handleClick = () => {
        // Navigate to the product page with the specific product ID
        navigate(`/products/${stripeProduct.id}`);
      };

      const handleAddToCart = () => {
        // Dispatch addToCart action with the selected product
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
        // Dispatch removeFromCart action with the product ID
        dispatch(removeFromCart(stripeProduct.id));
      };
    return (
      
        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          image= {stripeProduct.images}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {stripeProduct.name}
          </Typography>
    
          <Typography variant="body2" color="text.secondary">
            {stripeProduct.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           Pris:  {formattedPrice}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           Antal i lager:  {productInStock}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button onClick={handleRemoveFromCart}> - </Button>
          <Button onClick={handleAddToCart}> + </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
    
    );
  };
  
  export default ProductCard;