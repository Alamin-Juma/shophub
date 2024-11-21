import mongoose from "mongoose";
import dotenv from "dotenv"
import "colors"; // Initialize the library
import products from "./data/products";
import users from "./data/users";
import Product from "./models/productModel";
import Order from "./models/ordersModel";
import User from "./models/userModel";
import connectDB from './config/db'

dotenv.config()

connectDB()


console.log('Data Imported!'.green.inverse);

const importData = async () => {
    try {
        //delete everything 
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        //get the admin user before adding products
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((p) => {
            return { ...p, user: adminUser }
        })

        await Product.insertMany(sampleProducts)
        console.log('Data Imported!'.green.inverse);
        process.exit();

    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}



const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        console.log('Data Destroyed!'.red.inverse);
        process.exit();
      } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
      }
}

if (process.argv[2] === '-d') {
    destroyData();
  } else {
    importData();
  }