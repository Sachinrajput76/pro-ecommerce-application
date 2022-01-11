const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter Product price']
    },
    discount: {
        type: Number,
        default: 0.0
    },
    quantityAvailable: {
        type: Number,
        default: 1
    },
    sizes: [{
        type: Object,
        required: [true, 'Please enter product sizes'],
    }],
    colors: [{
        type: Object,
        required: [true, 'Please enter product colors']
    }],
    category: [{
        type: Object,
        required: [true, 'Please enter product category']
    }],
    currentPrice: {
        type: Number,
        required: [true, 'Please enter product current price']
    },

    // variant: [
    //     {
    //         type: String,
    //         required: [true, "please type variant color"]
    //     }
    // ],

    variant: [
        {
            type: Object,
            required: [true, "please enter variant"]
        }
    ],
    // images: {
    //     type: Array,
    //     required: [true, `Please enter your images`]
    // },
    images: [
        {
            public_id: {
                type: String,
                required: [true, "please upload images1"]
            },
            url: {
                type: String,
                required: [true, "please upload images2"]
            }
        }
    ],
    // punctuationReview: {
    //     countOpionions: {
    //         type: Number,
    //         required: [true, "Please enter your countOpionions"]
    //     },
    //     punctuation: {
    //         type: Number,
    //         required: [true, "Please enter your punctuation"]
    //     },
    //     votes: [
    //         {
    //             value: {
    //                 type: Number,
    //                 required: [true, "Please enter your votes value"]
    //             },
    //             count: {
    //                 type: Number,
    //                 required: [true, "Please enter your votes count"]
    //             }
    //         }
    //     ]
    // },
    // reviews: {
    //     type: Array,
    //     required: [false, 'Please enter your review value'],
    //     user: {
    //         type: mongoose.Schema.ObjectId,
    //         ref: 'User',
    //         required: [true, 'please enter user id to give review']
    //     },
    //     name: { type: String, required: [true, 'please enter name'] },
    //     avatar: { type: String, required: [true, 'please enter avatar'] },
    //     description: { type: String, required: [true, 'please enter description'] },
    //     punctuation: { type: Number, required: [true, 'please enter punctuation'] }
    // },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [false, "please enter user id"]
    }

})

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);