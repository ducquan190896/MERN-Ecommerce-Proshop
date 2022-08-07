import Product from './model/productModle.js'
import User from './model/userModle.js'
import productsData from './data/productData.js'
import usersData from './data/userData.js'
import Order from './model/orderModel.js'
import connectDB from './config/db.js'
import dotenv from 'dotenv'


dotenv.config({path: './backend/config/config.env'})
connectDB()


const importdata = async () => {
   try {
   
    await Product.deleteMany()
    await User.deleteMany()
    const users = await User.insertMany(usersData)
    const productData1 = productsData.map(product => ({...product, user: users[0]._id}))
    await Product.insertMany(productData1)
    console.log('product imported')
    process.exit()
   } catch (err) {
    console.log(`error: ${err.message}`)
    process.exit(1)
   }
}

const destroydata = async () => {
try {
    
    await Product.deleteMany()
    await Order.deleteMany()
    await User.deleteMany()
    console.log('data deleted')
    process.exit()
} catch (err) {
    console.log(`error: ${err.message}`)
    process.exit(1)
}
}

if(process.argv[2] === '-d') {
    destroydata()
} else  {
    importdata()
}


