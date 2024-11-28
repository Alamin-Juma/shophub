import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";

// import products from "../utils/products";
import Rating from "../components/Rating";
// import axios from "axios";
// import { Product } from "../utils/types/product_Type";
import { useGetSingleProductQuery } from "../slices/productsApiSlice";
import { useErrorHandler } from "../utils/helpers/errorHelpers";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { CartItem } from "../utils/types/cartItems_types";
import { ProductParams } from "../utils/types/product_params";



const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [localError, setLocalError] = useState<string | null>(null); // Renamed


  const { id: productId } = useParams<ProductParams>();

  const dispatch  = useDispatch()
  const navigate = useNavigate()

  const {
    data: product,
    isLoading,
    error,
  } = useGetSingleProductQuery(productId || "");

  const addToCartHandler = () => {
    if (!product) {
      setLocalError("Product is undefined");
      return;
    }
  
    const cartItem: CartItem = { 
      ...product, 
       // Ensure `qty` is coming from state or props
      quantity: qty
    };
  
    try {
      dispatch(addToCart(cartItem));
      navigate('/cart');
      setLocalError(null);
    } catch (err) {
      setLocalError("Failed to add product to cart");
    }
  };
  
  
  const { handleError } = useErrorHandler();

  // If product is not found or is out of stock, disable the button and quantity
  const isOutOfStock = product?.countInStock === 0;

  return (
    <>
     {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">Error: {handleError(error)}</Message>
      ) : localError ? ( // Render local error if present
        <Message variant="danger">{localError}</Message>
      ) : (
        <>
              <Message >Single products page </Message>

          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>
          <Row>
            <Col md={4}>
              <Image src={product?.image} alt={product?.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product?.rating || 0}
                    text={`${product?.numReviews || 0} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product?.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={5}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item className="border-bottom">
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product?.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className="border-bottom">
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product?.countInStock && product.countInStock > 0
                          ? "In Stock"
                          : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* Only render Qty section if in stock */}
                  {!isOutOfStock && (
                    <ListGroup.Item className="border-bottom">
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {/* prevent the use to input more than the ones in stock, so since array starts from zero, we add 1 to the key and index*/}
                            {[...Array(product?.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={isOutOfStock} // Disable button if out of stock
                      onClick={ addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col md={3}></Col>
            <Col md={3}></Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
