import express from 'express'

const router = express.Router()
import { Protectionroute, Adminroute } from '../middleware/protectroute.js'
import { Admingetsingleuser, Adminupdateuser, AdminUserDelete, AdminUserList } from '../controller/adminuserController.js'

router.route('/').get(Protectionroute, Adminroute, AdminUserList)
router.route('/:userid').get(Protectionroute, Adminroute, Admingetsingleuser)
router.route('/:userid').put(Protectionroute, Adminroute, Adminupdateuser)
router.route('/:userid').delete(Protectionroute, Adminroute, AdminUserDelete)

export default router