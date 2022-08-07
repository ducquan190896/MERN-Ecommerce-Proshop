import asyncHandler from 'express-async-handler'
import Product from '../model/productModle.js'

export const getproducts = asyncHandler(async (req, res) => {
        const perPage = 2 
        const page = req.query.page || 1 
        
        const keyword = req.query.keyword ? {
            name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } 
    : {}
    
        if(req.query.keyword) {
            console.log(req.query.keyword)
        }
        const productsnumber = await Product.countDocuments(keyword)
        const products = await Product.find(keyword).limit(perPage).skip(perPage * (page - 1))
        const pages = Math.ceil(productsnumber / perPage)
        console.log([...Array(pages).keys()])
        res.status(200).json({products, pages : Number(pages), page: Number(page)})
})


export const getproduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.productID)
    res.status(200).json(product)
})

export const deleteproduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.productID)
    if(!product) {
        res.status(400)
        throw new Error('product not found')
    } else {
        await product.remove()
        res.status(200).json({message: 'product deleted'})
    }
})

export const createproduct = asyncHandler(async (req, res) => {
        const data = {
            user: req.user._id,
            name: 'Sample name',
            price: 0,
          
            image: '/images/sample.jpg',
            brand: 'Sample brand',
            category: 'Sample category',
            countInStock: 0,
            numReviews: 0,
            description: 'Sample description',
        }
        const product = await Product.create(data)
        if(!product) {
            res.status(400)
            throw new Error('product not created')
        } else {
            res.status(200).json(product)
        }
    
})

export const updateproduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.productID)
    console.log(req.body)
    if(!product) {
        res.status(400)
        throw new Error('product not found')
    } else {
        const updatedproduct = await Product.findByIdAndUpdate(req.params.productID, req.body, {new: true})
        if(!updatedproduct) {
            res.status(400)
            throw new Error('product not updated')
    } else {
        res.status(200).json(updatedproduct)
    }
    }
})

export const productreview = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.productID)
    if(!product) {
        res.status(404)
        throw new Error('product not found')
    }
    if(product.user.toString() === req.user._id.toString() || req.user.isAdmin) {
        res.status(404)
        throw new Error('user has no right to comment on his or her own product')
    } 
    const existedreview = product.reviews.find(r => r.user.toString() === req.user._id.toString())
    if(existedreview) {
        res.status(404)
        throw new Error('user had the previous comment, cannot comment on this product anymore')
    }
    const review = {
        name: req.user.name,
        user: req.user._id,
        rating: Number(req.body.rating),
        comment: req.body.comment
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length,
    product.rating = product.reviews.reduce((t, r) => t + Number(r.rating), 0) / product.reviews.length
    await product.save()
    res.status(200).json(product)

})