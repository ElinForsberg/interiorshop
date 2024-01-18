import { useParams } from 'react-router-dom';
import {  StripeProduct, useGetProductByIdQuery } from '../../redux/services/productsApi';
import Header from '../../components/Header';
import HandleCart from '../../components/HandleCart';



const ProductPage = () => {
    const { id } = useParams<{ id: string }>(); // Ensure 'id' is always a string
    const { data, isLoading, isError } = useGetProductByIdQuery(id || ''); // Provide a default value for 'id'
  
    console.log(data);
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
      <HandleCart stripeProduct={data as StripeProduct}/>

    </div>
  );
}

export default ProductPage;
