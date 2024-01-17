import { useEffect, useState } from 'react';
import { useVerifyPaymentMutation } from '../../redux/services/checkoutApi';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/slices/shoppingCartSlice';
import Header from '../../components/Header';

function ConfirmationPage() {
    const [verifyPayment] = useVerifyPaymentMutation();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isPaymentVerified, setIsPaymentVerified] = useState(false);
    const dispatch= useDispatch();
    const sessionId = localStorage.getItem("session-id")
    
    const handleVerifyPayment = async () => {
        try {
          const result = await verifyPayment({ sessionId: sessionId || '' });
            
          if ('data' in result) {
            setIsPaymentVerified(true);
            localStorage.removeItem('session-id');
            dispatch(clearCart());
            console.log("payment is verified");
            
          } else {
            setIsPaymentVerified(false);
          }
        } catch (error) {
          console.error('Error during verifyPayment:', error);
          // Handle the error as needed
        }
      };

     useEffect(() => {    
        console.log('Component rendered');
    handleVerifyPayment();
  }, [])
  
  return (
    isPaymentVerified ?
  <div>
    <Header/>
    <div>Tack för din order</div>
   </div> :
   <div>
   Din order gick inte igenom
  </div>
  )
}

export default ConfirmationPage