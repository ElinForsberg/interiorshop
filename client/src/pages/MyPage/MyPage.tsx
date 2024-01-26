import { useGetPersonalOrdersQuery } from '../../redux/services/ordersApi';
import {  isLoggedIn, selectUser } from '../../redux/slices/userSlice';
import { Order } from "../../redux/services/ordersApi";
import styled from '@emotion/styled';
import { useAppSelector } from '../../redux/hooks';
import { Divider, Typography } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

function MyPage() {
   
    const { data: orderData, isSuccess } = useGetPersonalOrdersQuery();
    const user = useAppSelector(selectUser);
    const loggedInUser = useAppSelector(isLoggedIn);

console.log("logged", loggedInUser);

  if(!isSuccess) {
    return <div>Ordrar kunde inte hämtas</div>
  }
    return (
        <>
       
          {loggedInUser ? (
            <>
              <MyPageContainer>
                <Typography>Välkommen till mina sidor, {user?.name} </Typography>
              </MyPageContainer>
             <TitleContainer>
                <Typography variant="h6">Dina ordrar</Typography>
              </TitleContainer>
          
          {Array.isArray(orderData) && orderData.length > 0 ? (
            orderData.map((order: Order) => (
              <OrderContainer key={order._id}>
                {/* Render order details here */}
                <Typography>Order ID: {order._id}</Typography>
                <Divider/>
                <Typography>Namn: {order.name}</Typography>
                <Typography>Email: {order.email}</Typography>
                <Typography>Leverans adress: {order.address.street}, {order.address.postal_code}, {order.address.city}, {order.address.country}</Typography>
                <Divider/>
                <Typography>Dina köp</Typography>
                {order.products && order.products.map(product => (
                  <div key={product.stripeId}>
                    
                    <Typography>{product.description}</Typography>
                    <Typography>Antal: {product.quantity}</Typography>
                    <Typography>Pris: {product.price} {product.currency}</Typography>
                    <Typography>Summa: {product.total} {product.currency}</Typography>
                    
                  </div>
                ))}
                <Typography>Total summa: {order.totalSum} sek</Typography>
                <Divider/>
                {order.isShipped ?
                <OrderShippedContainer>
<                 Typography>din order är skickad</Typography> 
                  <SentimentSatisfiedAltIcon/>
                </OrderShippedContainer>
                  :
                  <Typography>din order väntar på att bli skickad</Typography>}
                  
              </OrderContainer>
              
            ))
          ) : (
            <NoOrdersContainer>
              <Typography>Du har inga ordrar ännu.</Typography>
      
            </NoOrdersContainer>
          )}
            </>
          ):( <NotAuthContainer>
            <Typography>Du måste vara inloggad för att kunna se Mina Sidor </Typography>
          </NotAuthContainer>)}
          
        </>
      );
    }
    
    const OrderContainer = styled.div`
      background-color: #edf0e9;
      padding: 1rem;
      margin: 1rem;
      border-radius: 8px;
      box-shadow: 0px 25px 20px -20px rgba(0,0,0,0.45);
    `;

    const MyPageContainer = styled.div`
    padding-top: 130px;
    background-color: #7CB7AF ;
    text-align: center;
    margin-bottom: 2rem;
    `;

    const TitleContainer = styled.div`
      margin-left: 2rem;
    `
    
    const NoOrdersContainer = styled.div`
      text-align: center;
      margin-top: 20px;
      padding-top: 150px;
    `;
    const NotAuthContainer = styled.div`
      padding-top: 250px;
    `;

    const OrderShippedContainer = styled.div`
    padding-top: 5px;
      display: flex;
    `;
    export default MyPage;