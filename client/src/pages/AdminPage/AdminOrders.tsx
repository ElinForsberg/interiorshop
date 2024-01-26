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
import { useGetAllOrdersQuery } from '../../redux/services/ordersApi';
import { Order } from '../../redux/services/ordersApi';
import { useMarkOrderAsshippedMutation} from '../../redux/services/ordersApi'
import styled from '@emotion/styled';
import { Typography } from '@mui/material';


function AdminOrders() {
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
    <PageContainer>
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
            <Typography>Ordernummer: {order._id}</Typography>
            {order.isShipped ? (
                    <Typography>Skickad</Typography>
                  ) : (
                    
                      <Typography>Ej skickad</Typography>
                      )} 
            </OrderTitleContainer>
           
            </AccordionSummary>
            <AccordionDetails>
            <Typography>Order skapad: {formatDate(order.created)}</Typography>
            <Typography>{order.name}</Typography>
                <Typography>{order.email}</Typography>
                <Typography>Leverans adress: {order.address.street}, {order.address.postal_code}, {order.address.city}, {order.address.country}</Typography>
                <Divider/>
                <Typography>Köpta produkter</Typography>
                {order.products && order.products.map(product => (
                  <div key={product.stripeId}>
                    <Typography>{product.description}</Typography>
                    <Typography>Antal: {product.quantity}</Typography>
                    <Typography>Pris: {product.price} {product.currency}</Typography>
                    <Typography>Summa: {product.total} {product.currency}</Typography>
                    <Divider light/>
                </div>
                 ))}
                 {order.isShipped ? (
                    <Typography>Ordern är skickad</Typography>
                  ) : (
                    <>
                      <Typography>Ordern väntar på att skickas</Typography>
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
          <Typography>Är du säker på att du vill markera ordern som skickad?</Typography>
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
    </PageContainer>
  );
}
const PageContainer = styled.div`

`
const OrderTitleContainer = styled.div`
width: 90%;
display: flex;
justify-content: space-between;
`
const FilterButtonContainer = styled.div`
    
    display: flex;
    flex-direction: row-reverse;
    padding-right:1rem;
    padding-top: 5px;
    padding-bottom: 5px;
`

export default AdminOrders;
