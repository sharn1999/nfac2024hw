import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL || 'mongodb+srv://oakhmetov:BdNFVR9gvsaB19KI@cluster0.hnptoaq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    )
    console.log('MongoDB connected...')
  } catch (err: any) {
    console.error(err.message)
    process.exit(1)
  }
}

export default connectDB
