import { useParams } from 'react-router-dom';
import {  StripeProduct, useGetProductByIdQuery } from '../../redux/services/productsApi';
import Header from '../../components/Header';
import HandleCart from '../../components/HandleCart';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';



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
    <div>
      <Header/>
      <p>{data?.name}</p>
      <p>{data?.description}</p>
      <img src={data?.images} width={400}/>
      <p>pris: {formattedPrice} </p>
      <HandleCart stripeProduct={data as StripeProduct} quantity={quantityInCart}/>

    </div>
  );
}

export default ProductPage;
