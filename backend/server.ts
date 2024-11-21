import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDb from './config/db'
import productsRoutes from './routes/productRouter'
import { errorHandler, notFound } from './middlewares/errorMiddleware'
dotenv.config()

connectDb() //connect to MongoDB

const app = express()

const _dirname = path.dirname(__filename);
const PORT: number = Number(process.env.PORT) || 4000;

app.use('/api/products', productsRoutes)

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
})