import Header from "../../components/Header"
import { useGetAllOrdersQuery } from "../../redux/services/ordersApi";

function AdminPage() {

    const { data } = useGetAllOrdersQuery();

    console.log(data);
    
  return (
    <div>
        <Header/>
    </div>
  )
}

export default AdminPage