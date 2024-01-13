
import {  useGetProductsQuery, useGetQuantityInStockQuery } from '../../redux/services/productsApi'
import ProductCard from './ProductCard';



function HomePage() {
    
    const { data: productsData, isLoading: productsIsLoading, isError: productsIsError } = useGetProductsQuery();
    const { data: quantityData, isLoading: quantityIsLoading, isError: quantityIsError } = useGetQuantityInStockQuery();
  
  console.log("stripe", productsData);
    console.log("db", quantityData);
    
  if (productsIsLoading || quantityIsLoading) {
    return <div>Loading...</div>;
  }

  if (productsIsError || quantityIsError) {
    return <div>Error fetching products</div>;
  }

  return (
    <div>
    {productsData?.data.map((product) => {
      // Find corresponding quantity data for the current product
      const quantity = quantityData?.find((q) => q.stripeId === product.id);
      const inStock = quantity?.inStock || 0; // Default to 0 if quantity is undefined
      return <ProductCard key={product.id} stripeProduct={product} productInStock={inStock} />;
    })}
  </div>
  );
}


export default HomePage