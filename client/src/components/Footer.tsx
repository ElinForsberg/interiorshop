import styled from "@emotion/styled"
import { Button, Divider,  Grid,  TextField, Typography } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

//Footer is only visual, no functions implemented
function Footer() {
  return (
    <FooterContainer>
        <ContentContainer>
            <Grid item xs={4}>
                <GridContainer>
                    <Typography variant="h4" color="primary.light">TrendigaRum</Typography>
                    <Typography variant="body1" color="primary.light">Möbler, belysning & inredning för alla</Typography>
                    <Divider color="white"/>
                    <Typography color="primary.light" variant="body2">TrendigaRum AB</Typography>
                    <Typography color="primary.light" variant="caption">Inredningsvägen 7</Typography><br/>
                    <Typography color="primary.light" variant="caption">34545 Möblebro</Typography>
                </GridContainer>
            </Grid>
                <Grid item xs={4} >
                    <GridContainer>
                        <Typography color="primary.light" variant="caption">Prenumerera på vårt nyhetsbrev</Typography><br/>
                        <StyledTextfield size="small" variant="filled" color="secondary"/>
                        <StyledBtn variant="contained" color="secondary">
                            Skicka
                        </StyledBtn>
                        <Typography color="primary.light">© 2024 ElinForsberg</Typography>
                    </GridContainer>
                </Grid>
            <Grid item xs={4}>
                <GridContainer>
                    <Typography color="primary.light">Följ oss på socialamedier</Typography>
                    <Typography color="primary.light">
                    <InstagramIcon style={{ marginRight: '1rem' }} />
                    <FacebookIcon style={{ marginRight: '1rem' }}  /> 
                    <TwitterIcon/>
                    </Typography>
                </GridContainer>
            </Grid>
        </ContentContainer >
    </FooterContainer>

  )
}

const FooterContainer = styled.div`
  background-color: #0A0708;
  margin-top: auto;
  width: 100%;
`;
const GridContainer = styled.div`
padding-top: 1.5rem;
padding-left: 1rem;
padding-right: 3rem;  
padding-bottom: 1.5rem;
`;
const ContentContainer = styled.div`
display: flex;
flex-direction: row; 
justify-content:space-between ;

    @media (max-width: 650px) {
    display: flex;
    flex-direction: column;
}
`;
const StyledBtn = styled(Button)`
   height: 40px;
   width: 50px;
   border-radius: 2px;
   margin-left: 4px;
   margin-bottom: 3rem;
`;
const StyledTextfield = styled(TextField)`
   height: 40px;
   width: 150px;
   border-radius: 0;
   background-color: #B1B1B1;
`;
export default Footer