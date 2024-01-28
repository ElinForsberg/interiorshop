
import {  Grid, Tab, Tabs } from '@mui/material';
import {  useGetProductsQuery, useGetQuantityInStockQuery } from '../../redux/services/productsApi'
import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import Loader from '../../components/Loader';




function HomePage( ) {
    
    const { data: productsData, isLoading: productsIsLoading, isError: productsIsError } = useGetProductsQuery();
    const { data: quantityData, isLoading: quantityIsLoading, isError: quantityIsError } = useGetQuantityInStockQuery();
    
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const [categories, setCategories] = useState<string[]>([]);

    const shoppingCart = useAppSelector((state: RootState) => state.shoppingCart);
    const cartItems = shoppingCart.cartItems;

    useEffect(() => {
      if (productsData?.data) {
        const uniqueCategories = Array.from(new Set(productsData.data.map((product) => product.metadata.category || '')))
        .filter((category) => category.trim() !=='');
        setCategories(uniqueCategories);
      }
    }, [productsData]);


    const filteredProducts = productsData?.data.filter(
      (product) => !selectedCategory || product.metadata.category === selectedCategory
    );

    const handleCategoryChange = (value: string) => {
      setSelectedCategory(value);  
    };
   
    
  if (productsIsLoading || quantityIsLoading) {
    return <Loader/>;
  }

  if (productsIsError || quantityIsError) {
    return <div>Error fetching products</div>;
  }

 

  return (
    <div>
      <div>
    <TabContainer>
          <Tabs 
        value={selectedCategory || ""}
        onChange={(_e, value) => handleCategoryChange(value as string)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        
      >
        <Tab label="Visa alla" value= "" />
        {categories.map((category) => (
          <Tab key={category} label={category} value={category} />
        ))}
      </Tabs>
      </TabContainer>
      <StyledGrid container spacing={3}>
        {filteredProducts?.map((product) => {
          const quantity = quantityData?.find((q) => q.stripeId === product.id);
          const inStock = quantity?.inStock || 0;
          const cartItem = cartItems.find((item) => item.id === product.id);
          const quantityInCart = cartItem?.quantity || 0;

          return (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard key={product.id} stripeProduct={product} productInStock={inStock} quantity={ quantityInCart}/>
            </Grid>
          );
        })}
      </StyledGrid>
      </div>
  </div>
  );
}

const TabContainer = styled.div`
display: flex;
justify-content: center;
background-color: #7CB7AF;
margin-bottom: 2.5rem;
/* position: relative; */
padding-top: 120px;
`;

const StyledGrid = styled(Grid)`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
`


export default HomePage