import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import Message from "../components/Message";
import { addToCart, removeFromCart, updateQuantity } from "../slices/cartSlice";
import { RootState } from "../utils/types/rootState";
import { CartItem } from "../utils/types/cartItems_types";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const incrementItemQuantity = (item: CartItem) => {
    if (item.quantity < item.countInStock) {
      dispatch(updateQuantity({ 
        id: item._id, 
        quantity: item.quantity + 1 
      }));
    }
  };
  
  const decrementItemQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ 
        id: item._id, 
        quantity: item.quantity - 1 
      }));
    }
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1 className="mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty
            <Link to="/" className="ml-2">
              Go Back
            </Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={3}>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => decrementItemQuantity(item)}
                        disabled={item.quantity === 1}
                      >
                        <FaMinus />
                      </Button>
                      <span className="mx-3">{item.quantity}</span>
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => incrementItemQuantity(item)}
                        disabled={item.quantity >= item.countInStock}
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash color="red" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
              </h2>
              ${cartItems
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
