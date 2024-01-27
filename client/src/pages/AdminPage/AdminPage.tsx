import React, { useState } from 'react';
import { Tabs, Tab,  } from '@mui/material';
import styled from '@emotion/styled';
import AdminOrders from './AdminOrders';
import AdminProducts from './AdminProducts';


function AdminPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

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
          {/* Content for Tab 1 */}
          <AdminOrders />
        </div>
      )}

      {selectedTab === 1 && (
        <div>
          {/* Content for Tab 2 */}
          
            <AdminProducts/>
            {/* Add your additional content here */}
         
        </div>
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
padding-top: 110px;
`
const TabContainer = styled.div`
display: flex;
justify-content: center;
background-color: #7CB7AF;
margin-bottom: 1rem;

`;
export default AdminPage;

