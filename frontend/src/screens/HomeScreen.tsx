import React, { useState, useEffect } from 'react'
import {Row, Col} from 'react-bootstrap'
// import products from '../utils/products'
import Products from '../components/Products'
import axios from 'axios'
import { Product } from '../utils/types/product_Type'

const HomeScreen = () => {
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
  }, []);
  
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Products product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
