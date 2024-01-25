import { useParams } from 'react-router-dom';
import {  StripeProduct, useGetProductByIdQuery } from '../../redux/services/productsApi';
import HandleCart from '../../components/HandleCart';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';



const ProductPage = () => {
    const { id } = useParams<{ id: string }>(); // Ensure 'id' is always a string
    const { data, isLoading, isError } = useGetProductByIdQuery(id || ''); // Provide a default value for 'id'
  
    const shoppingCart = useAppSelector((state: RootState) => state.shoppingCart);
    const cartItems = shoppingCart.cartItems;

    const cartItem = cartItems.find((item) => item.id === data?.id);
    const quantityInCart = cartItem?.quantity || 0;
    
    const formattedPrice = new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 2,
    }).format((data?.default_price.unit_amount  ?? 0) /100);
  
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching product</div>;
  }

  return (
    <PageContainer>
      <ImgContainer>
      <img src={data?.images} width={350}/>
      </ImgContainer>
      <InformationContainer>
        <TextContainer>
          <Typography variant="h3" >{data?.name}</Typography>
        </TextContainer>
        <TextContainer>
          <Typography>{data?.description}</Typography>
        </TextContainer>
      
        <TextContainer>
          <Typography>pris: {formattedPrice} </Typography>
        </TextContainer>
      <Typography variant="caption">Lägg i varukorgen</Typography>
      <HandleCart stripeProduct={data as StripeProduct} quantity={quantityInCart}/>
      </InformationContainer>
      

    </PageContainer>
  );
}

const PageContainer = styled.div`
padding-top: 160px;
display: flex;
@media (max-width: 650px) {
    flex-direction: column;
  }
`
const ImgContainer = styled.div`
  padding-left: 1rem;
`

const InformationContainer = styled.div`
padding-left: 4rem;
padding-right: 1rem;
`
const TextContainer = styled.div`
  padding-bottom: 2rem;
`
export default ProductPage;
