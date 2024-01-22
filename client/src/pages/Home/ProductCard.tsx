import React from 'react'
import { ProductInStock, StripeProduct } from '../../redux/services/productsApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HandleCart from '../../components/HandleCart';
import styled from '@emotion/styled';


interface ProductCardProps {
    stripeProduct: StripeProduct;
    productInStock: ProductInStock["inStock"];
  }

  const ProductCard: React.FC<ProductCardProps> = ({ stripeProduct, productInStock }) => {
    
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
    stockStatus = 'Out of stock';
    return (
      <OutOfStockCard sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
        component="img"
          height="250"
          image= {stripeProduct.images}
        />
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
        stripeProduct={stripeProduct}/>
      </CardActions>
    </OutOfStockCard>
    )
  } else if (productInStock <= 10) {
    stockStatus = 'Low in stock';
  } else {
    stockStatus = 'In stock';
  }

    return (
      
        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="250"
          image= {stripeProduct.images}
        />
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
        stripeProduct={stripeProduct}/>
      </CardActions>
    </Card>
    
    );
  };

  const OutOfStockCard = styled(Card)`
  background-color: #f8f0f0a0;
  `
  const StyledCardContent = styled(CardContent)`
  height: 150px;
  `
  
  export default ProductCard;