import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'

import connectBD from './config/db.js'

import Productrouter from './route/productRoute.js'
import Userrouter from './route/userRoute.js'
import { errorhandler, notFound } from './middleware/errorhandling.js'
import Orderrouter from './route/orderRoute.js'
import adminuserRoute from './route/adminuserRoute.js'
import uploadrouter from './route/uploadrouter.js'
import expressfileupload from 'express-fileupload'

dotenv.config({path: './backend/config/config.env'})
connectBD()
const app = express()

app.use(cors())
app.use(express.json())
// app.use(expressfileupload())


app.get('/', (req, res) => {
    res.status(200).json({message: 'welcome to ecommerce-app'})
})


const __dirname = path.resolve()
app.use('/backend/uploads', express.static(path.join(__dirname, '/backend/uploads')))
// use the same path folder in express.static
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


app.use('/api/upload', uploadrouter)


app.use('/api/products', Productrouter)
app.use('/api/user', Userrouter)
app.use('/api/order', Orderrouter)
app.get('/api/getpaypalkey', (req, res) => res.status(200).send(process.env.paypal_client_id))
app.use('/admin/users', adminuserRoute)



app.use(notFound)
app.use(errorhandler)

const PORT = 5000 || process.env.PORT

app.listen(PORT, () => console.log(`ecommerce app is running in the port  ${process.env.PORT}`))
