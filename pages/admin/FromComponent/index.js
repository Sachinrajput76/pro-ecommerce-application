import React, { useState, useRef } from "react";
import axios from 'axios'
import Select from 'react-select'
import Image from 'next/image'
import { messages } from "../../../utils/constants"
import { notify, isMatches, focusById, isEmail } from '../../../utils/utility'
const FormComponent = () => {


    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productDiscount, setProductDiscount] = useState('')
    const [productQuantity, setProductQuantity] = useState('')
    const [productSizes, setProductSizes] = useState('')
    const [productColors, setProductColors] = useState('')
    const [productCurrentPrice, setProductCurrentPrice] = useState('')
    const [productCategory, setProductCategory] = useState('')
    const [productSubCategory, setProductSubCategory] = useState('')
    const [fileObj, setFileObj] = useState([]);
    const [fileArray, setFileArray] = useState([]);

    const [images, setImages] = useState([])
    const [oldImages, setOldImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const invalidData = {
        productName: false,
        productPrice: false,
        productQuantity: false,
        productSizes: false,
        productColors: false,
        productCurrentPrice: false,
        productCategory: false,
        productSubCategory: false,
        images: false
    };
    const [invalid, setInvalid] = useState(invalidData);

    const productSizesOption = [
        { value: 'XXL', label: 'XXL' },
        { value: 'XL', label: 'XL' },
        { value: 'L', label: 'L' },
        { value: 'M', label: 'M' },
        { value: 'S', label: 'S' }
    ]
    const productCategoryOptions = [
        { value: 'Category 1', label: 'Category 1' },
        { value: 'Category 2', label: 'Category 2' },
        { value: 'Category 3', label: 'Category 3' },
        { value: 'Category 4', label: 'Category 4' },
        { value: 'Category 5', label: 'Category 5' }
    ]
    const productSubCategoryOptions = [
        { value: 'Category 1', label: 'Category 1' },
        { value: 'Category 2', label: 'Category 2' },
        { value: 'Category 3', label: 'Category 3' },
        { value: 'Category 4', label: 'Category 4' },
        { value: 'Category 5', label: 'Category 5' }
    ]
    const productColorsOption = [
        { value: 'Blue', label: 'Blue' },
        { value: 'Black', label: 'Black' },
        { value: 'White', label: 'White' }
    ]

    const onChange = (e) => {
        const files = Array.from(e.target.files)
        setImages([]);
        setOldImages([]);
        setImagesPreview([]);

        files.forEach(file => {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages(oldArray => [...oldArray, reader.result]);
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                }
            }
            reader.readAsDataURL(file)
        })
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     await axios.post('api/uploadFile', images).then(res => {
    //         console.log("res", res)
    //         notify(messages.ToastSuccess, "Success");
    //     }).catch((error) => {
    //         console.log(error);
    //         notify(messages.ToastError, "something went wrong");
    //         // setSpinner(false);
    //     });
    // }

    const validator = () => {
        var flag = false;
        /*Validations*/

        if (!isMatches(productName, messages.OnlyAlphaNumeric)) {
            flag = invalid.productName = true;
            focusById('product_name');
            notify(messages.ToastError, messages.InvalidName)
        }
        else if (!isMatches(productPrice, messages.OnlyAlphaNumeric)) {
            flag = invalid.productPrice = true;
            focusById('product_price');
            notify(messages.ToastError, messages.InvalidPrice)
        }
        else if (!isMatches(productQuantity, messages.OnlyAlphaNumeric)) {
            flag = invalid.productQuantity = true;
            focusById('productQuantity');
            notify(messages.ToastError, messages.InvalidQuantity)
        }
        else if (!isMatches(productSizes, messages.OnlyAlphaNumeric)) {
            flag = invalid.productSizes = true;
            focusById('productSizes');
            notify(messages.ToastError, messages.InvalidProductSizes)
        }
        else if (!isMatches(productColors, messages.OnlyAlphaNumeric)) {
            flag = invalid.productColors = true;
            focusById('productColors');
            notify(messages.ToastError, messages.InvalidProductColors)
        }
        else if (!isMatches(productCurrentPrice, messages.OnlyAlphaNumeric)) {
            flag = invalid.productCurrentPrice = true;
            focusById('productCurrentPrice');
            notify(messages.ToastError, messages.InvalidProductCurrentPrice)
        }
        else if (!isMatches(productCategory, messages.OnlyAlphaNumeric)) {
            flag = invalid.productCategory = true;
            focusById('ProductCategory');
            notify(messages.ToastError, messages.InvalidProductCategory)
        }
        else if (!isMatches(productSubCategory, messages.OnlyAlphaNumeric)) {
            flag = invalid.productSubCategory = true;
            focusById('productSubCategory');
            notify(messages.ToastError, messages.InvalidProductSubCategory)
        }
        else if (!isMatches(images, messages.OnlyAlphaNumeric)) {
            flag = invalid.images = true;
            focusById('customFile');
            notify(messages.ToastError, messages.InvalidImages)
        }
        setInvalid(invalid)
        return flag ? false : true;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name: productName,
            price: parseInt(productPrice),
            discount: parseInt(productDiscount),
            quantityAvailable: parseInt(productQuantity),
            sizes: productSizes,
            colors: productColors,
            category: productCategory,
            currentPrice: parseInt(productCurrentPrice),
            variant: productSubCategory,
        }

        if (images.length !== 0) data.images = images
        console.log("data", data)

        let isValid = validator();
        if (isValid) {
            await axios.post('api/products', data).then(res => {
                console.log("res", res)
                notify(messages.ToastSuccess, "Success");
            }).catch((error) => {
                console.log(error);
                notify(messages.ToastError, "something went wrong");
                // setSpinner(false);
            });
        }
        console.log("data", data)
    }

    return (
        <div className="p-4 m-z">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mx-auto" onSubmit={handleSubmit}>
                <div className="m-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="product_name"
                    >
                        Product Name
                    </label>
                    <input
                        className="bg-white border border-gray-300 focus:outline-none focus:shadow-outline  rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                        type="text"
                        name="product_name"
                        id="product_name"
                        onChange={(e) => setProductName(e.target.value)}
                        value={productName}
                        placeholder="mi mobile"
                    />
                </div>
                <div className="m-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="product_price"
                    >
                        Product Price
                    </label>
                    <input
                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                        id="product_price"
                        name="product_price"
                        onChange={(e) => setProductPrice(e.target.value)}
                        value={productPrice}
                        type="text"
                        placeholder="product price"
                    />
                </div>

                <div className="m-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="productDiscount"
                    >
                        Product Discount
                    </label>
                    <input
                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                        type="text"
                        id="productDiscount"
                        name="productDiscount"
                        onChange={(e) => setProductDiscount(e.target.value)}
                        value={productDiscount}
                        placeholder="Product Discount"
                    />
                </div>
                <div className="m-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="productQuantity"
                    >
                        Product Quantity Available
                    </label>
                    <input
                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                        type="text"
                        id="productQuantity"
                        name="productQuantity"
                        onChange={(e) => setProductQuantity(e.target.value)}
                        value={productQuantity}
                        placeholder="product Quantity"
                    />
                </div>
                <div className="m-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="productSizes"
                    >
                        Product Sizes
                    </label>
                    {/* <input
                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                        type="text"
                        id="productSizes"
                        name="productSizes"
                        onChange={(e) => setProductSizes(e.target.value)}
                        value={productSizes}
                        placeholder="product Sizes"
                    /> */}
                    <Select
                        isMulti
                        id="productSizes"
                        selectInputRef
                        onChange={(e) => setProductSizes(e)}
                        options={productSizesOption} />
                </div>
                <div className="m-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="ProductColors"
                    >
                        Product Colors
                    </label>
                    {/* <input
                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                        type="text"
                        id="ProductColors"
                        name="ProductColors"
                        onChange={(e) => setProductColors(e.target.value)}
                        value={productColors}
                        placeholder="Product Colors"
                    /> */}
                    <Select
                        isMulti
                        id="productColors"
                        selectInputRef
                        onChange={(e) => setProductColors(e)}
                        options={productColorsOption} />
                </div>

                <div className="m-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="ProductCurrentPrice"
                    >
                        Product Current Price
                    </label>
                    <input
                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                        type="text"
                        id="ProductCurrentPrice"
                        name="ProductCurrentPrice"
                        onChange={(e) => setProductCurrentPrice(e.target.value)}
                        value={productCurrentPrice}
                        placeholder="Product Current Price"
                    />
                </div>

                <div className="m-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="productCategory"
                    >
                        Product Category
                    </label>
                    {/* <input
                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                        type="text"
                        id="productCategory"
                        name="productCategory"
                        onChange={(e) => setProductCategory(e.target.value)}
                        value={productCategory}
                        placeholder="productCategory"
                    /> */}
                    <Select
                        selectInputRef
                        id="ProductCategory"
                        onChange={(e) => setProductCategory(e)}
                        options={productCategoryOptions} />
                </div>

                <div className="m-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="productSubCategory"
                    >
                        Sub Category
                    </label>
                    {/* <input
                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                        type="sub_category"
                        id="username"
                        name="sub_category"
                        onChange={(e) => setProductSubCategory(e.target.value)}
                        value={productSubCategory}
                        placeholder="sub_category"
                    /> */}
                    <Select
                        selectInputRef
                        id="productSubCategory"
                        onChange={(e) => setProductSubCategory(e)}
                        options={productSubCategoryOptions} />
                </div>
                <div className="m-4">
                    {/* <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="Product_img"
                    >
                        Product Image 222
                    </label> */}
                    {/* <input type='file' id="imgInp" accept="image/*" onChange={previewFile} onClick={(event) => { event.target.value = null }} /> */}

                    <input
                        type="file"
                        name="room_images"
                        className="custom-file-input"
                        id="customFile"
                        onChange={onChange}
                        multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                        Choose Images
                    </label>
                </div>
                <div className="m-4 flex">
                    {imagesPreview.map(img => (
                        <img
                            src={img}
                            key={img}
                            alt="Images Preview"
                            className="mt-3 mr-2"
                            width="55"
                            height="52"
                        />
                    ))}
                </div>
                <div className="m-4">
                    <button className="btn btn-blue" type="submit" value="Submit">Submit</button>
                </div>
            </form>
        </div>
    );

}

export default FormComponent;
