import User from '../model/userModle.js'
import AsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

export const Protectionroute = AsyncHandler(async (req, res, next) => {
    let token 
    if(!req.headers.authorization && !req.headers.authorization.startsWith('Bearer')) {
        res.status(404)
        throw new Error('token not Found')
    }
    token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.private_key)
    if(!decoded) {
        res.status(404)
        throw new Error('token is wrong')
    } else {
        const user = await User.findById(decoded._id).select('-password')
        if(!user) {
            res.status(404)
            throw new Error('user not found')
        } else {
            req.user = user
            next()
        }
    }


} )

export const Adminroute = async (req, res, next) => {
    if(req.user.name && req.user.isAdmin) {
        next()
    } else {
        res.status(404)
        throw new Error('not authorized as an Admin')
    }
} 
