import { Button, TextField } from "@mui/material";
import { useGetProductsQuery, useGetQuantityInStockQuery, useUpdateProductInStockMutation } from "../../redux/services/productsApi";
import styled from "@emotion/styled";
import {  useState } from "react";


function AdminProducts() {
    const { data: productsData} = useGetProductsQuery();
    const { data: quantityData } = useGetQuantityInStockQuery();
    const [updateProductInStock] = useUpdateProductInStockMutation();
    const [newStockValue, setNewStockValue] = useState<number>(0);
    const [isInStockChanged, setIsInStockChanged] = useState<boolean>(false);


    const handleSaveChanges = async (event: React.MouseEvent<HTMLElement>, productId: string) => {
      event.preventDefault();
  
      const selectedProduct = quantityData?.find((product) => product._id === productId);
  
      if (selectedProduct && isInStockChanged) {
        setNewStockValue(selectedProduct.inStock);
        updateProductInStock({ productId: selectedProduct._id, inStock: newStockValue });
        setIsInStockChanged(false); // Reset the flag after updating
      }
    };
  
    const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewStockValue(Number(e.target.value));
      setIsInStockChanged(true); // Set the flag when the value changes
    };


  return (
   <div>
        {productsData?.data?.map((product) => {
          const quantity = quantityData?.find((q) => q.stripeId === product.id);
          const inStock = quantity?.inStock || 0;
          const id = quantity?._id || ''; // Access the _id from quantityData
            
           
            
          return (
            <Container key={product.id}>
                <ImgContainer>
                    <img src={product.images}  width="250px"/>
                
                </ImgContainer>



              <StyledTextfield
          id="outlined"
          label="Titel"
          variant="outlined"
          defaultValue={product.name}
            />
        <StyledTextfield
          id="outlined"
          label="Beskrivning"
          variant="outlined"
          defaultValue={product.description}
          multiline
        />
        <StyledTextfield
          id="outlined"
          label="Pris"
          variant="outlined"
          defaultValue={product.default_price.unit_amount}
          
            />
           <StyledTextfield
           id="outlined"
           label="In Stock"
           variant="outlined"
           defaultValue={inStock}
           onChange={handleInStockChange}
            />

                <StyledTextfield
                        id="outlined"
                        label="Bild"
                        variant="outlined"
                        defaultValue={product.images}
                    />
        
        <Button variant="outlined"  onClick={(e) => handleSaveChanges(e, id)}>Spara ändringar</Button>

        
            </Container>
          );
        })}
      </div>
   
  )
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 2rem;
    padding-left: 1rem;
    padding-right: 1rem;
`
const ImgContainer = styled.div`
   
    padding-bottom: 1rem;
`
const StyledTextfield = styled(TextField)`
padding-bottom: 1rem;
`
export default AdminProducts