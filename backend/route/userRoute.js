import express from 'express'
import { Register, Signin, Updateuser } from '../controller/userController.js'
import {Protectionroute} from '../middleware/protectroute.js'


const router = express.Router()

// router.route('/').get((req, res) => res.status(200).json({message: 'hello'}))
router.route('/signin').post(Signin)
router.route('/register').post(Register)
router.route('/updateuser').put(Protectionroute, Updateuser)

export default router
