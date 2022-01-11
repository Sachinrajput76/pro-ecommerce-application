
import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import APIFeatures from '../utils/apiFeatures'
import Product from '../models/products'
import cloudinary from 'cloudinary'
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
// import products from '../utils/data/products';

// Setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



// Create all rooms   =>   /api/rooms
const allProducts = catchAsyncErrors(async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    })
})
const singleProduct = catchAsyncErrors(async (req, res) => {

    try {
        const product = await Product.findById(req.query.pid);
        if (!product) {
            res.status(400).json({
                success: false,
                error: "product not found in this id"
            })
        }
        res.status(200).json({
            success: true,
            product: product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }

})
const newProduct = catchAsyncErrors(async (req, res) => {
    try {
        const images = req.body.images;
        let imagesLinks = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'e-commerce-app/images',
            });
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        req.body.images = imagesLinks;
        // req.body.user = req.user._id
        const product = await Product.create(req.body);
        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})
export {
    allProducts,
    newProduct,
    singleProduct
}