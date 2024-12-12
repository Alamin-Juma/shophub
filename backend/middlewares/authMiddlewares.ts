import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express"
import asyncHandler from './asyncHandler'
import User, { IUser } from '../models/userModel';

//Protect routes
const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token;

    //Read the JWT from the cookie 
    token = req.cookies.jwt

    if (token) {
        try {
            if (!process.env.JWT_SECRET) {
                throw new Error("JWT_SECRET is not defined in the environment variables");
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Type guard for JwtPayload
            if (typeof decoded === 'object' && 'userId' in decoded) {
                const user = await User.findById(decoded.userId).select('-passwword');

                if (!user) {
                    res.status(404);
                    throw new Error('User not found');
                }

                // Attach user to the request object
                //req.user = user
                (req as Request & { user?: IUser }).user = user; 
                next(); // Proceed to the next middleware
            } else {
                res.status(401);
                throw new Error('Not authorized, invalid token');
            }
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})


// Admin middleware
const admin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if ((req as Request & { user?: IUser }).user && (req as Request & { user?: IUser }).user?.isAdmin) {
        next()
    } else {
        res.status(401).json({
            message: 'Not authorized as admin'
        });
        throw new Error('Not authorized as admin')
    }
})


export { protect, admin }