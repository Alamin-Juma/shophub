import asyncHandler from "../middlewares/asyncHandler";
import { Request, Response, NextFunction } from "express"
import dotenv from 'dotenv'
import User, { IUser } from "../models/userModel";
import generateToken from "../utils/helpers/generateToken";

dotenv.config()

//@desc    Auth user & get token
//@route POST /api/users/login
//@access Public 
const authUser = asyncHandler(async (req: Request, res: Response) => {
    // console.log(req.body)
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {

        generateToken(res, user._id.toString());

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
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User alredy  exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {

        generateToken(res, user._id.toString());

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//@desc    Logout user / clear cookie
//@route POST /api/users/login
//@access Private 
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: 'Logged out successfully' })
})


//@desc    Get user profile
//@route GET  /api/users/profile
//@access Private 
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    // Type guard to ensure user exists
    const reqUser = (req as Request & { user?: IUser }).user
    if (!reqUser) {
        res.status(401);
        throw new Error('Not authorized');
    }

    const user = await User.findById(reqUser._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    } else {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }
})


//@desc    Update user profile
//@route PUT  /api/users/profile
//@access Private 
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const reqUser = (req as Request & { user?: IUser }).user;
    
    if (!reqUser) {
        res.status(401);
        throw new Error("Not authorized");
    }
    
    const user = await User.findById(reqUser._id);
    
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    
    console.log("User before update:", user);
    
    // Update name and email
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    // Only update password if provided
    if (req.body.password) {
        console.log("Updating password");
        user.password = req.body.password; // Set the new password
        await user.save(); // Save the user to trigger the pre-save hook
    } else {
        await user.save(); // Save the user without updating the password
    }
    
    const updatedUser = await User.findById(reqUser._id);
    
    console.log("User after update:", updatedUser);
    
    res.json({
        _id: updatedUser?._id,
        name: updatedUser?.name,
        email: updatedUser?.email,
        isAdmin: updatedUser?.isAdmin,
    });
});
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