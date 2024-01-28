import { useEffect, useState } from 'react';
import { useVerifyPaymentMutation } from '../../redux/services/checkoutApi';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/slices/shoppingCartSlice';
import { Order } from '../../redux/services/ordersApi';
import { Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styled from '@emotion/styled';
import Loader from '../../components/Loader';

function ConfirmationPage() {
    const [verifyPayment] = useVerifyPaymentMutation();
    const [loading, setLoading] = useState(true);
    const [isPaymentVerified, setIsPaymentVerified] = useState(false);
   const [orderDetails, setOrderDetails] = useState<Order | null>();
    const dispatch= useDispatch();
    const sessionId = localStorage.getItem("session-id")
    
    const handleVerifyPayment = async () => {
        try {
          const result = await verifyPayment({ sessionId: sessionId || '' });
            console.log("respons", result);
          if ('data' in result) {
            setIsPaymentVerified(true);
            
            localStorage.removeItem('session-id');
            dispatch(clearCart());
            console.log("payment is verified");
            const orderResponse = result.data.order
            setOrderDetails(orderResponse)
            console.log("orderResponse", orderResponse);
            console.log("orderDetails", orderDetails);
            
            
          } else {
            setIsPaymentVerified(false);
          }
        } catch (error) {
          console.error('Error during verifyPayment:', error);
          // Handle the error as needed
        } finally {
          setLoading(false); // Set loading to false once the verification is complete
        }
      };

     useEffect(() => {    
    handleVerifyPayment();
  },[])
  
  return (
    <div>
      {loading ? (
        <Loader/>
      
      ) : (
        isPaymentVerified ?
          <OrderWrapper>
            <OrderContainer>
              <Typography>{orderDetails?.name},</Typography>
              <Typography>Tack för din order </Typography>
              <Typography>ordernummer: {orderDetails?._id}</Typography>
              <Typography>Vi skickar dina varor så fort vi kan</Typography>
              <FavoriteBorderIcon />
            </OrderContainer>
          </OrderWrapper> :
          <div>
            Din order gick inte igenom
          </div>
      )}
    </div>
  )
}

const OrderWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
`

const OrderContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 60vw;
height: 60vh;
border-radius: 10px;
box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`
export default ConfirmationPage