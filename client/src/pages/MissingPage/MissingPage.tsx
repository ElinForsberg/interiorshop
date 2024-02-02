import styled from "@emotion/styled"
import { Button, Typography } from "@mui/material"
import  missingImg  from"../../assets/4620096_404_icon.png"
import { StyledLink } from "../../Theme"

//If user try to reach a missing url, gets redirected to this page
function MissingPage() {
  return (
    <PageContainer>
        <div>
        <Typography variant="h1">Oops!</Typography>
        <Typography variant="h5">Sidan hittades inte... </Typography>
        <StyledBtn variant="contained">
            <StyledLink to={"/"}>
                Gå tillbaka
            </StyledLink>           
        </StyledBtn>
        </div>
        <div>
        <StyledImg src={missingImg}/>
        </div>
        
    </PageContainer>
  )
}

const PageContainer = styled.div`
    padding-top: 10rem;
    padding-left: 3rem;
    padding-right: 3rem;
    padding-bottom: 3rem;
    display: flex;
    justify-content: space-between;
    @media (max-width: 650px) {
        flex-direction: column;
    }
`;
const StyledImg = styled.img`
    width: 100%;
    object-fit: cover;
`;
const StyledBtn = styled(Button)`
    margin-top: 2rem;
`;
export default MissingPage