import  { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import Divider from '@mui/material/Divider';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Header from '../../components/Header';
import { useGetAllOrdersQuery } from '../../redux/services/ordersApi';
import { Order } from '../../redux/services/ordersApi';
import { useMarkOrderAsshippedMutation} from '../../redux/services/ordersApi'
import styled from '@emotion/styled';

function AdminPage() {
  const { data } = useGetAllOrdersQuery();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [markOrderAsShipped] = useMarkOrderAsshippedMutation();
  const [showShippedOrders, setShowShippedOrders] = useState(false);
  
  const handleCheckboxChange = (orderId: string) => {
    setSelectedOrderId(orderId);
    setOpenDialog(true);
    console.log(data)
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const confirmMarkAsShipped = async () => {
    try {
        if(selectedOrderId) await markOrderAsShipped(selectedOrderId);
  
        // Handle any additional logic here after the order is marked as shipped
        setOpenDialog(false);
      } catch (error) {
        // Handle errors if the mutation fails
        console.error('Error marking order as shipped:', error);
      }
  };

  const filteredOrders = data?.filter((order: Order) => {
    if (showShippedOrders) {
      return !order.isShipped;
    } else {
      return true; // Show all orders when not filtered
    }
  });

  function formatDate(createdDate: string) {
    const date = new Date(createdDate);
    const formattedDate = date.toLocaleDateString('sv-SE'); 
    const formattedTime = date.toLocaleTimeString('sv-SE'); 
  
    return `${formattedDate} ${formattedTime}`;
  }

  return (
    <div>
      <Header />
      <FilterButtonContainer>
      <Button variant="outlined" size="small" onClick={() => setShowShippedOrders(!showShippedOrders)}>
        {showShippedOrders ? 'Visa alla ordrar' : 'Visa endast ej skickade ordrar'}
      </Button>
      </FilterButtonContainer>
      <>
        {filteredOrders?.map((order: Order) => (
          <Accordion key={order._id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
            <OrderTitleContainer>
            <p>Ordernummer: {order._id}</p>
            {order.isShipped ? (
                    <p>Skickad</p>
                  ) : (
                    
                      <p>Ej skickad</p>
                      )} 
            </OrderTitleContainer>
           
            </AccordionSummary>
            <AccordionDetails>
            <p>Order skapad: {formatDate(order.created)}</p>
            <p>{order.name}</p>
                <p>{order.email}</p>
                <p>Leverans adress: {order.address.street}, {order.address.postal_code}, {order.address.city}, {order.address.country}</p>
                <Divider/>
                <p>Köpta produkter</p>
                {order.products && order.products.map(product => (
                  <div key={product.stripeId}>
                    <p>{product.description}</p>
                    <p>Antal: {product.quantity}</p>
                    <p>Pris: {product.price} {product.currency}</p>
                    <p>Summa: {product.total} {product.currency}</p>
                    <Divider light/>
                </div>
                 ))}
                 {order.isShipped ? (
                    <p>Ordern är skickad</p>
                  ) : (
                    <>
                      <p>Ordern väntar på att skickas</p>
                      <Button variant="outlined" color= "secondary" onClick={() => handleCheckboxChange(order._id)}>
                        Markera order som skickad
                      </Button>
                      </>
                  )}        
            </AccordionDetails>
            
                      
           
          </Accordion>
        ))}
      </>

      {/* Dialog component */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <p>Är du säker på att du vill markera ordern som skickad?</p>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
            Avbryt
          </Button>
          <Button onClick= {confirmMarkAsShipped}  variant="contained" color="primary">
            Bekräfta
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}

const OrderTitleContainer = styled.div`
width: 90%;
display: flex;
justify-content: space-between;
`
const FilterButtonContainer = styled.div`
    background-color:#B1B1B1;
    display: flex;
    flex-direction: row-reverse;
    padding-right:1rem;
    padding-top: 5px;
    padding-bottom: 5px;
`

export default AdminPage;
