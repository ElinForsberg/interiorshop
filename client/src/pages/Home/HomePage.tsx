
import { Button } from '@mui/material';
import Header from '../../components/Header';
import {  useGetProductsQuery, useGetQuantityInStockQuery } from '../../redux/services/productsApi'
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { clearCart } from '../../redux/slices/shoppingCartSlice';



function HomePage() {
    
    const { data: productsData, isLoading: productsIsLoading, isError: productsIsError } = useGetProductsQuery();
    const { data: quantityData, isLoading: quantityIsLoading, isError: quantityIsError } = useGetQuantityInStockQuery();
  
    const dispatch = useDispatch();
    const shoppingCart = useSelector((state: RootState) => state.shoppingCart);

  console.log("stripe", productsData);
    console.log("db", quantityData);

    const seeCart = () => {
        console.log(shoppingCart);
        
    }
    const emptyCart = () => {
        dispatch(clearCart());
    }
    
  if (productsIsLoading || quantityIsLoading) {
    return <div>Loading...</div>;
  }

  if (productsIsError || quantityIsError) {
    return <div>Error fetching products</div>;
  }

  return (
    <>
    <Header/>
    <div>
    {productsData?.data.map((product) => {
      // Find corresponding quantity data for the current product
      const quantity = quantityData?.find((q) => q.stripeId === product.id);
      const inStock = quantity?.inStock || 0; // Default to 0 if quantity is undefined
      return <ProductCard key={product.id} stripeProduct={product} productInStock={inStock} />;
    })}
  </div>
  <Button onClick={seeCart}> Se varukorgen</Button>
  <Button onClick= {emptyCart}>Töm varukorgen</Button>
  </>
  );
}


export default HomePage