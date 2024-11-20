import React from 'react'
import {Row, Col} from 'react-bootstrap'
import products
 from '../utils/products'
import Products from '../components/Products'
type Props = {}

const HomeScreen = (props: Props) => {
  return (
    <>
    <h1>Latest Products</h1>
    <Row>
        {products.map((product) => (
            <Col key={product._id}  sm={12} md={6} lg={4} xl={3}>
               <Products product={product} />
            </Col>
        ))}
    </Row>
    </>
  )
}

export default HomeScreen