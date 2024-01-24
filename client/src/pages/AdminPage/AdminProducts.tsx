import { Button, TextField } from "@mui/material";
import { useGetProductsQuery, useGetQuantityInStockQuery, useUpdateProductInStockMutation } from "../../redux/services/productsApi";

import styled from "@emotion/styled";
import { useState } from "react";


function AdminProducts() {
    const { data: productsData} = useGetProductsQuery();
    const { data: quantityData } = useGetQuantityInStockQuery();
    const [updateProductInStock] = useUpdateProductInStockMutation();
    const [newStockValue, setNewStockValue] = useState<number>(0);
    
const handleSaveChanges = async (event: React.MouseEvent<HTMLElement>, productId: string) => {
    event.preventDefault();
   
      const selectedProduct = quantityData?.find(product => product._id == productId)

      if(selectedProduct){
        setNewStockValue(selectedProduct.inStock)
        updateProductInStock({productId: selectedProduct._id, inStock: newStockValue})
        }
     
};


  return (
   <div>
        {productsData?.data?.map((product) => {
          const quantity = quantityData?.find((q) => q.stripeId === product.id);
          const inStock = quantity?.inStock || 0;
          const id = quantity?._id || ''; // Access the _id from quantityData
       
           
            
          return (
            <div key={product.id}>
                <ImgContainer>
                    <img src={product.images} height="150"/>
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue={product.images}
                    />
                </ImgContainer>
              <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue={product.name}
            />
        <TextField
          required
          id="outlined-textarea"
          label="Required"
          defaultValue={product.description}
          multiline
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue={product.default_price.unit_amount}
          
            />
           <TextField
           id="outlined"
           label="In Stock"
           variant="outlined"
           defaultValue={inStock}
          onChange={(e) => setNewStockValue(Number(e.target.value))}
            />
        
        <Button variant="outlined" onClick={(e) => handleSaveChanges(e, id)}>Spara ändringar</Button>

        
            </div>
          );
        })}
      </div>
   
  )
}
const ImgContainer = styled.div`
    width: 150px;
    display: flex;
    flex-direction: column;
`
export default AdminProducts