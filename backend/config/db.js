import mongoose from 'mongoose'


const connectDB = async () => {
    try {
        const coon = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          
        })
        console.log(`mongo connected ${coon.connection.host}`)
    } catch (err) {
    console.log(`error: ${err.message}`)
    process.exit(1)
    }
}

export default connectDB