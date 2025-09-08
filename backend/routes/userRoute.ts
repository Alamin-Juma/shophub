import express, { Request, Response, NextFunction } from "express";
// import products from '../data/products'
import {
    authUser,
    registerUser,
    logoutUser,
    updateUser,
    updateUserProfile,
    deleteUser,
    getUserById,
    getUsers,
    getUserProfile,
} from "../controllers/userController";
import { protect } from "../middlewares/authMiddlewares";

const router = express.Router()



// router.get('/', getProducts)
router.route('/').post(registerUser).get(getUsers)
router.post('/logout', logoutUser)
router.post('/login', authUser)
router.route('/profile').get(protect,  getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser)

export default router