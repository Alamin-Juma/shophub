import express, { Request, Response, NextFunction } from "express";
// import products from '../data/products'
import { getProducts, getSingleProduct } from "../controllers/productController";

const router = express.Router()



// router.get('/', getProducts)
router.route('/').get(getProducts)
router.route('/:id').get(getSingleProduct)
  
export default router