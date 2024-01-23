import Header from '../../components/Header'
import { useGetPersonalOrdersQuery } from '../../redux/services/ordersApi';
import {  isLoggedIn, selectUser } from '../../redux/slices/userSlice';
import { Order } from "../../redux/services/ordersApi";
import styled from '@emotion/styled';
import { useAppSelector } from '../../redux/hooks';

function MyPage() {
   
    const { data: orderData, isSuccess } = useGetPersonalOrdersQuery();
    const user = useAppSelector(selectUser);
    const loggedInUser = useAppSelector(isLoggedIn);


  if(!isSuccess) {
    return <div>Ordrar kunde inte hämtas</div>
  }
    return (
        <>
          <Header />
          {loggedInUser ? (
            <>
            <div>Mina Sidor</div>
          <p>{user?.name}</p>
          <p>Dina ordrar</p>
          {Array.isArray(orderData) && orderData.length > 0 ? (
            orderData.map((order: Order) => (
              <OrderContainer key={order._id}>
                {/* Render order details here */}
                <p>Order ID: {order._id}</p>
                <p>name: {order.name}</p>
                <p>email: {order.email}</p>
                <p>Leverans adress: {order.address.street}, {order.address.postal_code}, {order.address.city}, {order.address.country}</p>
                <p>Dina köp</p>
                {order.products && order.products.map(product => (
                  <div key={product.stripeId}>
                    {/* Render product details here */}
                    <p>{product.description}</p>
                    <p>Antal: {product.quantity}</p>
                    <p>Pris: {product.price} {product.currency}</p>
                    <p>Summa: {product.total} {product.currency}</p>
                    {/* Add other product details as needed */}
                  </div>
                ))}
                <p>total summa: {order.totalSum} sek</p>
                {order.isShipped ?
                  <p>din order är skickad</p> :
                  <p>din order väntar på att bli skickad</p>}
              </OrderContainer>
            ))
          ) : (
            <NoOrdersContainer>
              <p>Du har inga ordrar ännu.</p>
      
            </NoOrdersContainer>
          )}
            </>
          ):( <div>
            <p>Du måste vara inloggad för att kunna se Mina Sidor </p>
          </div>)}
          
        </>
      );
    }
    
    const OrderContainer = styled.div`
      background-color: lightblue;
    `;
    
    const NoOrdersContainer = styled.div`
      text-align: center;
      margin-top: 20px;
    `;
    
    export default MyPage;