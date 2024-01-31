import { useParams } from 'react-router-dom';
import {  StripeProduct, useGetProductByIdQuery } from '../../redux/services/productsApi';
import HandleCart from '../../components/HandleCart';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import LazyLoad from 'react-lazy-load';
import Loader from '../../components/Loader';


//Page for presenting a single product based on id. 
const ProductPage = () => {
    const { id } = useParams<{ id: string }>(); 
    const { data, isLoading, isError } = useGetProductByIdQuery(id || ''); 
  
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
    return <Loader/>
  }

  if (isError) {
    return <div>Error fetching product</div>;
  }

  return (
    <PageContainer>
      <ImgContainer>
      <LazyLoad width={350} offset={300}>
      <img src={data?.images} width={350}/>
      </LazyLoad>
      
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
padding-top: 180px;
display: flex;
padding-bottom: 3rem;
@media (max-width: 650px) {
    flex-direction: column;
  }
`
const ImgContainer = styled.div`
  padding-left: 1rem;
  padding-bottom: 3rem;
`

const InformationContainer = styled.div`
padding-left: 4rem;
padding-right: 1rem;
`
const TextContainer = styled.div`
  padding-bottom: 2rem;
`
export default ProductPage;
