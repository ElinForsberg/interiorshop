// import { Button, TextField } from "@mui/material";
// import { Controller, useForm } from "react-hook-form";
// import { useGetQuantityInStockQuery, useUpdateProductInStockMutation } from "../redux/services/productsApi";
// import styled from "@emotion/styled";

// type FormData = {
//     inStock: number;
//     productId: string;
// }


// function TestHook() {
//     const { data: quantityData } =  useGetQuantityInStockQuery();
//     const [updateProductInStock] = useUpdateProductInStockMutation();
    
//     const form = useForm<FormData>({})
//     const { register, control, handleSubmit, formState } = form;

//     const onSubmit = async (formData: FormData) => {
//         try {
//           const updatePromises = Object.entries(formData).map(([productId, inStock]) => {
//             return updateProductInStock({
//               productId,
//               inStock,
//             });
//           });
    
//           await Promise.all(updatePromises);
    
//           // Handle successful update
//           console.log("Products in stock updated successfully");
//         } catch (error) {
//           // Handle error
//           console.error("Error updating products in stock", error);
//         }
//       };
    

//   return (
    
//     <StyledDiv>
        
        
//             <form onSubmit={handleSubmit(onSubmit)}>
//             {quantityData?.map((quantity) => (
//             <div key={quantity._id}>
//                 <Controller 
//             name={`productId[${quantity._id}]`} 
//             control={control}
//             defaultValue={quantity._id}
//             render={({ field }) => (
//        <TextField {...field} />
//             )}
//        />
//         <Controller 
//             name={`inStock[${quantity._id}]`} 
//             control={control}
//             defaultValue={quantity.inStock}
//             render={({ field }) => (
//        <TextField {...field} />
       
//     )}
    
//  />
//  <Button type= "submit">Spara</Button>
// </div>
// ))}
// </form>
       
        
//     </StyledDiv>
//   )
// }

// const StyledDiv = styled.div`
// padding-top: 150px;
// `
// export default TestHook