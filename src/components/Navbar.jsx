import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { logoutSuccess, selectUser } from '../redux/userRedux';
import { mobile } from '../responsive';


// background-color: red;

const Container = styled.div `
  height: 60px;
  ${mobile({ height: '50px'})}
 
`;

const Wrapper = styled.div`
   padding: 10px 20px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   ${mobile({ padding: '10px 0px'})}
`;


const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`
const Language =  styled.span`
  font-size: 40px;
  cursor: pointer;
  ${mobile({ display: 'none'})}
`

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  cursor: pointer;
  
  
`
const Input = styled.input`
  border: none;
  outline: none;
  
  

  ${mobile({ width: '50px'})}
`

const Center = styled.div`
  flex: 1;
  text-align: center;
`

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: '15px'})}
`

const Right = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  align-item: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: 'center'})}
`
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px
  
 
`

const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity)
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch()

  const signIn = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const registerClick = (e) => {
    e.preventDefault();
    navigate('/register')

  };

  const signOut = (e) => {
    console.log('sing Out');
    e.preventDefault();

    dispatch(logoutSuccess());

  }

  return (
    <Container>
        <Wrapper>
           <Left>
             <Language>EN</Language>
             <SearchContainer>
               <Input placeholder='Search' />
               <Search style={{color:'gray', fontsize:16}}/>
             </SearchContainer>
           </Left> 
           <Center><Logo>Shopping App</Logo></Center> 
           <Right>
            {!user ? <>
             <MenuItem onClick={registerClick}>REGISTER</MenuItem>

             <MenuItem onClick={signIn}>
              SIGN IN 
            </MenuItem>
            </>
            : 
            <MenuItem onClick={signOut}>
              SIGN OUT 
            </MenuItem>
}

             <Link to='/cart'>
             <MenuItem>
               <Badge badgeContent = {quantity} color ='primary' >
                 <ShoppingCartOutlined/>
               </Badge>         
             </MenuItem>
             </Link>
           </Right>         
        </Wrapper>
        </Container>
  )
}

export default Navbar