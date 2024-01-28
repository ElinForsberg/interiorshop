import { useGetPersonalOrdersQuery } from '../../redux/services/ordersApi';
import {  selectUser } from '../../redux/slices/userSlice';
import { Order } from "../../redux/services/ordersApi";
import styled from '@emotion/styled';
import { useAppSelector } from '../../redux/hooks';
import { Divider, Typography } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';

function MyPage() {
   
    const { data: orderData, isLoading, isSuccess, error } = useGetPersonalOrdersQuery(); 
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    function formatDate(createdDate: string) {
      const date = new Date(createdDate);
      const formattedDate = date.toLocaleDateString('sv-SE'); 
      const formattedTime = date.toLocaleTimeString('sv-SE'); 
    
      return `${formattedDate} ${formattedTime}`;
    }

    const compareOrderDates = (a: Order, b: Order) => {
      const dateA = new Date(a.created).getTime();
      const dateB = new Date(b.created).getTime();
      return dateB - dateA; // Compare in descending order
    };
    
  
    if (error) {
     navigate('/');
     return null;
    }

    if (isLoading) {
      return <Loader/>;
    }
    

  if(!isSuccess) {
    return <div>Ordrar kunde inte hämtas</div>
  }
    
    return (
        <>
       
          {user && 
            <>
              <MyPageContainer>
                <Typography>Välkommen till mina sidor, {user?.name} </Typography>
              </MyPageContainer>
             <TitleContainer>
                <Typography variant="h6">Dina ordrar</Typography>
              </TitleContainer>
          
          {Array.isArray(orderData) && orderData.length > 0 ? (
            [...orderData]
            .sort(compareOrderDates)
            .map((order: Order) => (
              <OrderContainer key={order._id}>
                {/* Render order details here */}
                <Typography>Order ID: {order._id}</Typography>
                <Typography>Datum: {formatDate(order.created)}</Typography>
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
<                 Typography>Din order är skickad</Typography> 
                  <SentimentSatisfiedAltIcon/>
                </OrderShippedContainer>
                  :
                  <Typography>Din order väntar på att bli skickad</Typography>}
                  
              </OrderContainer>
              
            ))
          ) : (
            <NoOrdersContainer>
              <Typography>Du har inga ordrar ännu.</Typography>
      
            </NoOrdersContainer>
          )}
            </>
          }
          
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
    `;   
    const NoOrdersContainer = styled.div`
      text-align: center;
      margin-top: 20px;
      padding-top: 150px;
    `;
    const OrderShippedContainer = styled.div`
    padding-top: 5px;
      display: flex;
    `;
    export default MyPage;