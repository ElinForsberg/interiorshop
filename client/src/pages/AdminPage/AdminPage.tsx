import React, { useState } from 'react';
import { Tabs, Tab,  } from '@mui/material';
import styled from '@emotion/styled';
import AdminOrders from './AdminOrders';
import AdminProducts from './AdminProducts';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/slices/userSlice';
import { useAuthorizeQuery } from '../../redux/services/usersApi';

//AdminPanel page where admin for the page can tab bewteen orders and products
function AdminPage() {
  const { data, error } = useAuthorizeQuery();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  if ( error && !user?.isAdmin) {
    navigate('/401');
    return null;
   } else if ( data && !data.isAdmin) {
    navigate('/401')
    return null;
   }


  return (
    <PageContainer>
        <TabContainer>
            <Tabs value={selectedTab} onChange={handleChange} variant="fullWidth">
                <Tab label="Ordrar" />
                <Tab label="Produkter" />
            </Tabs>
        </TabContainer>
      

      {selectedTab === 0 && (
        <div>
          <AdminOrders />
        </div>
      )}

      {selectedTab === 1 && (
        <div>
            <AdminProducts/>
        </div>
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
padding-top: 150px;
`;
const TabContainer = styled.div`
display: flex;
justify-content: center;
background-color: #7CB7AF;
margin-bottom: 2rem;
`;

export default AdminPage;

