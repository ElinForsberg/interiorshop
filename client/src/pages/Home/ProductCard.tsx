import React from 'react'
import { ProductInStock, StripeProduct } from '../../redux/services/productsApi';
import { Card, CardContent, Typography, CardActionArea, CardActions, Button }from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HandleCart from '../../components/HandleCart';
import styled from '@emotion/styled';
import { ShoppingCartItem } from '../../redux/slices/shoppingCartSlice';
import LazyLoad from 'react-lazy-load';


interface ProductCardProps {
    stripeProduct: StripeProduct;
    productInStock: ProductInStock["inStock"];
    quantity: ShoppingCartItem['quantity'];
  }

  //ProductCard component to display the products
  const ProductCard: React.FC<ProductCardProps> = ({ stripeProduct, productInStock, quantity }) => {
    
    const navigate = useNavigate();
      
      const formattedPrice = new Intl.NumberFormat('sv-SE', {
        style: 'currency',
        currency: 'SEK',
        minimumFractionDigits: 2,
      }).format(stripeProduct.default_price.unit_amount_decimal / 100);

    const handleClick = () => {
      if(productInStock >=1)
        navigate(`/products/${stripeProduct.id}`);
    }
      
      let stockStatus = '';
  
  if (productInStock === 0) {
    stockStatus = 'Slut i lager';
    return (
      <OutOfStockCard sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick}>
     
        <LazyLoad  height={"250px"} width={"345px"} >
          <OutOfStockImg src={stripeProduct.images}/>
        </LazyLoad>
        <StyledCardContent>
          <Typography gutterBottom variant="h5" component="div">
           {stripeProduct.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {stripeProduct.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           Pris:  {formattedPrice}
          </Typography>
             <Typography variant="body1" color="black">
            {stockStatus}
          </Typography>  
        </StyledCardContent>
      </CardActionArea>
      <CardActions>
      <Button variant='outlined'>Meddela mig när varan är åter</Button>
      </CardActions>
    </OutOfStockCard>
    )
  } else if (productInStock <= 10) {
    stockStatus = 'Få i lager';
  } else {
    stockStatus = 'Finns i lager';
  }

    return (
      
        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick}>
    
        <LazyLoad height={"250px"} width={"345px"} >
          <StyledImg src={stripeProduct.images}/>
        </LazyLoad>
        <StyledCardContent>
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
            {stockStatus}
          </Typography>  
        </StyledCardContent>
      </CardActionArea>
      <CardActions>
        <HandleCart
            stripeProduct={stripeProduct} quantity={quantity}/>
      </CardActions>
    </Card>
    
    );
  };

  const OutOfStockCard = styled(Card)`
  background-color: #f8f0f0a0;
  `;
  const StyledCardContent = styled(CardContent)`
  height: 150px;
  `;
  const StyledImg = styled.img`
    width: 345px;
  height: 250px;
  object-fit: cover;
  `;
    const OutOfStockImg = styled.img`
    width: 345px;
    height: 250px;
    object-fit: cover;
    filter: blur(2px);
  `;
  export default ProductCard;