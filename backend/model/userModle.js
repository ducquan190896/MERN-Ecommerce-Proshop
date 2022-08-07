import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }

},  {
    timestamps: true
})

userschema.methods.verifypassword = async function(inputpassword) {
    const isCorrect = await bcrypt.compare(inputpassword, this.password)
    return isCorrect
}
userschema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    } 
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        
    
})




const User = mongoose.model('User', userschema)

export default User

