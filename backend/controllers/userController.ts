import asyncHandler from "../middlewares/asyncHandler";
import { Request, Response, NextFunction } from "express"
import dotenv from 'dotenv'
import User from "../models/userModel";
import jwt from 'jsonwebtoken'

dotenv.config()

//@desc    Auth user & get token
//@route POST /api/users/login
//@access Public 
const authUser = asyncHandler(async (req: Request, res: Response) => {
    // console.log(req.body)
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))) {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
          }
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: '30d',
          });
          

        //set JWT as HTTP-Only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict', // Use 'strict', 'lax', or 'none' as per your requirement
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
          });
          
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,

        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


//@desc    Register user 
//@route POST /api/users/
//@access Public 
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    res.json('register user')
})

//@desc    Logout user / clear cookie
//@route POST /api/users/login
//@access Private 
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    res.json('logout user')
})


//@desc    Get user profile
//@route GET  /api/users/profile
//@access Private 
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    res.json('get user profile')
})


//@desc    Update user profile
//@route PUT  /api/users/profile
//@access Private 
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
    res.json('update user profile')
})

//@desc    Get Users
//@route GET  /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req: Request, res: Response) => {
    res.json('get users')
})


//@desc    Get Users
//@route GET  /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req: Request, res: Response) => {
    res.json('get user by id')
})


//@desc    Delete Users
//@route DELETE  /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    res.json('delete users')
})


//@desc    Update Users
//@route PUT  /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req: Request, res: Response) => {
    res.json('update user')
})


export { 
    authUser,
    registerUser,
    logoutUser,
    updateUser,
    updateUserProfile,
    deleteUser,
    getUserById,
    getUsers,
    getUserProfile,
}