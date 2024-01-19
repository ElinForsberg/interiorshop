
import { useEffect } from 'react';
import Header from '../../components/Header'
import { useGetPersonalOrdersQuery } from '../../redux/services/ordersApi';
import { useAuthorizeQuery } from '../../redux/services/usersApi';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/slices/userSlice';
import { Order } from "../../redux/services/ordersApi";
import styled from '@emotion/styled';

function MyPage() {
    const dispatch= useDispatch();
    const { data, error } = useAuthorizeQuery();
    const { data: orderData } = useGetPersonalOrdersQuery();

    useEffect(() => {
      if (data) {
        console.log(data);
        dispatch(loginUser(data));
        console.log(orderData);
      } else if (error) {
        console.error(error);
      }
    }, [data, error, dispatch, orderData]);


    
    
    return (
        <>
          <Header />
          <div>Mina Sidor</div>
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