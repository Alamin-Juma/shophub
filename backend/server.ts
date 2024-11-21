import express from 'express'
import path from 'path'
import products from './data/products'
import dotenv from 'dotenv'
import connectDb from './config/db'

dotenv.config()

connectDb() //connect to MongoDB

const app = express()

const _dirname = path.dirname(__filename);
const PORT: number = Number(process.env.PORT) || 4000;

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const {id} = req.params
    const product = products.find((p) => p._id === id)
    res.json(product)
})

app.listen(PORT, () => {
    console.log(    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
})