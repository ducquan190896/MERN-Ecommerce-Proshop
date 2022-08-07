
import User from '../model/userModle.js'
import Asynchandler from 'express-async-handler'


export const AdminUserList = Asynchandler(async (req, res) => {
    const users = await User.find()
    if(!users) {
        res.status(404)
        throw new Error('user list not Found')
    } else {
        res.status(200).json(users)

    }
    
})

export const AdminUserDelete = Asynchandler(async (req, res) => {
    const userid = req.params.userid
    console.log(req.params.userid)
    const user = await User.findById(userid)
    if(!user) {
        res.status(404)
        throw new Error('user list not Found')
    } else {
        await user.remove()
        res.status(200).json({message: 'user deleted'})

    }
    
})
export const Admingetsingleuser = Asynchandler(async (req, res) => {
    const userid = req.params.userid
    console.log(req.params.userid)
    const user = await User.findById(userid)
    if(!user) {
        res.status(404)
        throw new Error('user list not Found')
    } else {
        
        res.status(200).json(user)

    }
    
})

export const Adminupdateuser = Asynchandler(async (req, res) => {
    const userid = req.params.userid
    console.log(req.params.userid)
    const user = await User.findById(userid)
    if(!user) {
        res.status(404)
        throw new Error('user list not Found')
    } else {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin
        await user.save()
        res.status(200).json(user)

    }
    
})