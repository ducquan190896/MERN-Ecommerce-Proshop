import express from 'express'
import { createOrder, getAllorders, getMyOrders, getsingleorder, getsingleorderByAdmin, updateorder, updateorderdelivery } from '../controller/orderController.js'
import { Adminroute, Protectionroute } from '../middleware/protectroute.js'

const router = express.Router()

// router.get('/myorder',  (req, res) => res.status(200).json({message: 'order sent'}))
router.route('/').post(Protectionroute, createOrder)
router.route('/myorder').get(Protectionroute ,getMyOrders)
router.route('/allorders').get(Protectionroute, Adminroute, getAllorders)
router.route('/:orderid').put(Protectionroute, updateorder)
router.route('/:orderid/delivered').put(Protectionroute, Adminroute, updateorderdelivery)
router.route('/:orderid').get(Protectionroute, getsingleorder)
router.route('/:orderid/orderByAdmin').get(Protectionroute, Adminroute, getsingleorderByAdmin)


export default router

