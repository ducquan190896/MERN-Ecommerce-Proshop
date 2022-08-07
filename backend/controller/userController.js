import User from '../model/userModle.js'
import AsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

const generateToken = (userid) => {
    return jwt.sign({_id: userid}, process.env.private_key, {expiresIn: '1h'})
}


export const Signin = AsyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user) {
        res.status(404)
            throw new Error('email not found')
    } else {
        const isCorrect = await user.verifypassword(password)
        console.log(isCorrect)
        if(!isCorrect) {
            res.status(404)
            throw new Error('password is wrong')
        }  
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
    
            })
             
    }
})

export const Register = AsyncHandler(async (req, res) => {
    const {email, password, name} = req.body
    let user = await User.findOne({email})
    if(user) {
        res.status(404)
            throw new Error('email exists')
    }
    user = await User.create({email, password, name})
    if(!user) {
        res.status(404)
        throw new Error('user cannot be created')
    } else {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)

        })
    }
})

export const Updateuser = AsyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id)
        if(!user) {
            res.status(400)
            throw new Error('user not Found')
        }

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        }
        const updateduser = await user.save({validateBeforeSave: false})

        res.status(200).json({
            _id: updateduser._id,
            name: updateduser.name,
            email: updateduser.email,
            isAdmin: updateduser.isAdmin,
            token: generateToken(updateduser._id)
        })

})