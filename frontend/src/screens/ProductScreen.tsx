import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import axios from "axios";
import { Product } from "../utils/types/product_Type";

type ProductParams = {
  id: string;
};

const ProductScreen = () => {
  const [qty, setQty] = useState(1);

  const { id: productId } = useParams<ProductParams>();


  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Making request to /api/products...');
        const { data } = await axios.get('/api/products');
        console.log('Response from API:', data);
        setProducts(data);
      } catch (error: any) {
        console.error(
          'Error fetching products:',
          error.response ? error.response.data : error.message
        );
      }
    };
  
    fetchProducts();
  }, [productId]);
  const product = products.find((p) => p._id === productId);

  // If product is not found or is out of stock, disable the button and quantity
  const isOutOfStock = product?.countInStock === 0;

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={3}>
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
            <ListGroup.Item>Description: {product?.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
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
                        {[...Array(product?.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={isOutOfStock}  // Disable button if out of stock
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
  );
};

export default ProductScreen;
