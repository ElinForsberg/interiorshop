
import styled from '@emotion/styled';
import ShoppingCart from './ShoppingCart';

function Header() {
  return (
    <HeaderContainer>
        <ShoppingCart/>
    </HeaderContainer>
  )
}
const HeaderContainer = styled('div')`
  background-color: aquamarine;
  height: 100px;
`;


export default Header