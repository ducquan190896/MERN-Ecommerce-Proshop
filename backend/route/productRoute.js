import express from 'express'

const router = express.Router()
import {getproducts, getproduct, deleteproduct, updateproduct, createproduct, productreview} from '../controller/ProductController.js' 
import {Protectionroute, Adminroute} from '../middleware/protectroute.js'

router.route('/').get(getproducts)
router.route('/').post(Protectionroute, Adminroute ,createproduct)
router.route('/:productID').get(getproduct)
router.route('/:productID/review').post(Protectionroute, productreview)
router.route('/:productID').delete(Protectionroute, Adminroute ,deleteproduct)
router.route('/:productID').put(Protectionroute, Adminroute ,updateproduct)


export default router