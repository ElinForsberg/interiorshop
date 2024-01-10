
import {  useGetProductsQuery, useGetQuantityInStockQuery } from '../../services/products'



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
      
    </div>
  );
}


export default HomePage