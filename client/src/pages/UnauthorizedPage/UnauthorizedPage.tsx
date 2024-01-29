import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import { StyledLink } from "../../Theme";

function UnauthorizedPage() {
  return (
    <PageContainer>
        <Typography variant="h1">401 -obehörig</Typography>
        <Typography variant="h5">Du har inte behörighet till den här sidan</Typography>
        <StyledBtn variant="contained">
            <StyledLink to={"/"}>
                Gå tillbaka
            </StyledLink>           
        </StyledBtn>
    </PageContainer>
  )
}
const PageContainer = styled.div`
    padding-top: 14rem;
    padding-left: 3rem;
    padding-right: 3rem;
    padding-bottom: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const StyledBtn = styled(Button)`
    margin-top: 2rem;
`;
export default UnauthorizedPage