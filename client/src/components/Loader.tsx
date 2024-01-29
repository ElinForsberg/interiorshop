// Loader.tsx
import CircularProgress from '@mui/material/CircularProgress';
import styled from '@emotion/styled';


const Loader = () => {
  return (
    <LoaderContainer>
      <CircularProgress />
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
export default Loader;
