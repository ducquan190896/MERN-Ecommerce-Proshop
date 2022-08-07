import Order from '../model/orderModel.js'
import AsyncHandler from 'express-async-handler'
import connectDB from '../config/db.js'
import { ObjectID } from 'bson'


export const createOrder = AsyncHandler( async (req, res) => {
    await connectDB()
const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = await Order.create({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

   

    res.status(201).json(order)
  }

})

export const getsingleorder = AsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.orderid).populate('user', 'name email')
    if(!order) {
        res.status(404)
        throw new Error('order not found')
    }
    if(order.user._id.toString() !== req.user._id.toString()) {
        res.status(404)
        throw new Error('not Authorized to get the order')
    }
    res.status(200).json(order)
})

export const getMyOrders = AsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.status(200).json(orders)
  })
  
export const updateorder = AsyncHandler(async (req, res) => {
    const {paymentResult} = req.body
    const order = await Order.findById(req.params.orderid).populate('user', 'name email')
    if(!order) {
        res.status(404)
        throw new Error('order not found')
    }
    if(order.user._id.toString() !== req.user._id.toString()) {
        res.status(404)
        throw new Error('not Authorized to get the order')
    }
    order.paymentResult = paymentResult
    order.isPaid = true
    await order.save({validateBeforeSave: true})
    res.status(200).json(order)
})

export const getAllorders = AsyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'name email')
  if(!orders) {
    res.status(400)
    throw new Error('orders not found')
  } else {
    res.status(200).json(orders)
  }
})
export const updateorderdelivery = AsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.orderid)
    if(!order) {
      res.status(404)
      throw new Error('order not found')
    } else {
      order.isDelivered = true,
      order.deliveredAt = Date.now()
      await order.save()
      res.status(200).json(order)
    }
    
})

export const getsingleorderByAdmin = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderid).populate('user', 'name email')
  if(!order) {
      res.status(404)
      throw new Error('order not found')
  }

 
  res.status(200).json(order)
})