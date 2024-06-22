import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'
dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const app = express()

app.use(express.json())

app.listen(3000,() => {
        console.log('Server is running at port 3000!!')
    }
);

app.use('/api/auth',authRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Server error: '

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})