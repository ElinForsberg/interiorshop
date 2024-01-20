
import { Button, Grid, Tab, Tabs } from '@mui/material';
import Header from '../../components/Header';
import {  useGetProductsQuery, useGetQuantityInStockQuery } from '../../redux/services/productsApi'
import ProductCard from './ProductCard';
import {  useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { clearCart } from '../../redux/slices/shoppingCartSlice';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
// import { loginUser } from '../../redux/slices/userSlice';
import { useAuthorizeQuery } from '../../redux/services/usersApi';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/slices/userSlice';



function HomePage() {
    
    const { data: productsData, isLoading: productsIsLoading, isError: productsIsError } = useGetProductsQuery();
    const { data: quantityData, isLoading: quantityIsLoading, isError: quantityIsError } = useGetQuantityInStockQuery();
  
    const dispatch = useAppDispatch();
    const shoppingCart = useSelector((state: RootState) => state.shoppingCart);

    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const [categories, setCategories] = useState<string[]>([]);
    // const categories: string[] = Array.from(new Set(productsData?.data.map((product) => product.metadata.category || '')));

    useEffect(() => {
      if (productsData?.data) {
        const uniqueCategories = Array.from(new Set(productsData.data.map((product) => product.metadata.category || '')))
        .filter((category) => category.trim() !=='');
        setCategories(uniqueCategories);
      }
    }, [productsData]);

  //   const { data, error } = useAuthorizeQuery();

  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //     dispatch(loginUser(data));
  //   } else if (error) {
  //     console.error(error);
  //   }
  // }, [data, error, dispatch]);
  

    const filteredProducts = productsData?.data.filter(
      (product) => !selectedCategory || product.metadata.category === selectedCategory
    );

    const handleCategoryChange = (value: string) => {
      setSelectedCategory(value);
      
      
    };
    const seeCart = () => {
        console.log(shoppingCart);
        
    }
    const emptyCart = () => {
        dispatch(clearCart());
        console.log(selectedCategory);
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
    <TabContainer>
          <Tabs
        value={selectedCategory}
        onChange={(e, value) => handleCategoryChange(value as string)}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Visa alla" value= "" />
        {categories.map((category) => (
          <Tab key={category} label={category} value={category} />
        ))}
      </Tabs>
      </TabContainer>
      <Grid container spacing={3}>
        {filteredProducts?.map((product) => {
          const quantity = quantityData?.find((q) => q.stripeId === product.id);
          const inStock = quantity?.inStock || 0;

          return (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard key={product.id} stripeProduct={product} productInStock={inStock} />
            </Grid>
          );
        })}
      </Grid>

  </>
  );
}

const TabContainer = styled.div`
display: flex;
justify-content: center;
`;
export default HomePage