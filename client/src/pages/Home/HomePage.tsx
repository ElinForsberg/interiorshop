
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Header from '../../components/Header';
import {  useGetProductsQuery, useGetQuantityInStockQuery } from '../../redux/services/productsApi'
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { clearCart } from '../../redux/slices/shoppingCartSlice';
import { useEffect, useState } from 'react';



function HomePage() {
    
    const { data: productsData, isLoading: productsIsLoading, isError: productsIsError } = useGetProductsQuery();
    const { data: quantityData, isLoading: quantityIsLoading, isError: quantityIsError } = useGetQuantityInStockQuery();
  
    const dispatch = useDispatch();
    const shoppingCart = useSelector((state: RootState) => state.shoppingCart);

    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const [categories, setCategories] = useState<string[]>([]);
    // const categories: string[] = Array.from(new Set(productsData?.data.map((product) => product.metadata.category || '')));

    useEffect(() => {
      if (productsData?.data) {
        const uniqueCategories = Array.from(new Set(productsData.data.map((product) => product.metadata.category || '')));
        setCategories(uniqueCategories);
      }
    }, [productsData]);
    
    const filteredProducts = productsData?.data.filter(
      (product) => !selectedCategory || product.metadata.category === selectedCategory
    );

    
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
        <FormControl fullWidth>
          <InputLabel id="category-filter-label">Kategorier</InputLabel>
          <Select
            labelId="category-filter-label"
            id="category-filter"
            value={selectedCategory}
            label="Category Filter"
            onChange={(e) => setSelectedCategory(e.target.value as string)}
          >
            <MenuItem value="">Visa alla</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        {filteredProducts?.map((product) => {
          const quantity = quantityData?.find((q) => q.stripeId === product.id);
          const inStock = quantity?.inStock || 0;
          return <ProductCard key={product.id} stripeProduct={product} productInStock={inStock} />;
        })}
      </div>
  <Button onClick={seeCart}> Se varukorgen</Button>
  <Button onClick= {emptyCart}>Töm varukorgen</Button>
  </>
  );
}


export default HomePage