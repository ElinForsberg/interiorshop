import React from 'react'
import { ProductInStock, StripeProduct } from '../../redux/services/productsApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

interface ProductCardProps {
    stripeProduct: StripeProduct;
    productInStock: ProductInStock["inStock"];
  }

  const ProductCard: React.FC<ProductCardProps> = ({ stripeProduct, productInStock }) => {
    // Render your product details using the 'product' prop
    return (
      
        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
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
           Antal i lager:  {productInStock}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Buy
        </Button>
      </CardActions>
    </Card>
    
    );
  };
  
  export default ProductCard;