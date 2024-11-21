import asyncHandler from "../middlewares/asyncHandler";
import { Request, Response, NextFunction } from "express"
import Product from "../models/productModel";
import mongoose from "mongoose";

//@desc    Fetch all products
//@route GET/api/products
//@access Public 
const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find({})
    res.json(products)
})


//@desc    Fetch a product
//@route GET/api/products/:id
//@access Public 
const getSingleProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404); // Not Found
        throw new Error("Resource not found: Invalid ID");
    }

    const product = await Product.findById(id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Resource not found");
    }
})

export {getProducts, getSingleProduct}