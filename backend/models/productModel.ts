import mongoose from 'mongoose';

//the user creating product not same user doing a review 
//relational dependency
const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // Refers to the user who left the review
        ref: 'User', 
    },
}, { timestamps: true });


const productSchema = new mongoose.Schema({
    //relationship between a product and the user who added it.
    user: {
        //specific document in another collection
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //User model for relationship mapping
        // Refers to the user who created the product
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0.0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    //one-to-many relationship between a product and its reviews.
    // Embedding multiple reviews in the product
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0.0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
}, {
    // Automatically creates createdAt and updatedAt fields
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
