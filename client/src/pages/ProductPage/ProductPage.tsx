import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../services/products';

function ProductPage() {
    const { id } = useParams<{ id: string }>(); // Ensure 'id' is always a string
    const { data, isLoading, isError } = useGetProductByIdQuery(id || ''); // Provide a default value for 'id'

  console.log("productpage", data);
  console.log("id", id);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching product</div>;
  }

  // Render your product details using the 'data' variable here

  return (
    <div>
      {/* Render product details */}
    </div>
  );
}

export default ProductPage;
