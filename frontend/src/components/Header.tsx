import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/logo.png'
import { UseSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import { CartItem } from '../utils/types/cartItems_types';
import { RootState } from '../utils/types/rootState';

type Props = {};

const Header = (props: Props) => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  // console.log(cartItems)

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand>
          <img src={logo} alt="ShopHub" />
          ShopHub 
          </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to='/cart'>
              <Nav.Link>
                <FaShoppingCart /> Cart
                {
                  cartItems.length > 0 && (
                    <Badge pill bg='success' style={{marginLeft: '5px'}}>
                      {cartItems.reduce((a,c) => a + c.quantity, 0)}
                    </Badge>
                  )
                }
              </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
              <Nav.Link >
                <FaUser /> Sign In
              </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
