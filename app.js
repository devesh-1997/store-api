require('dotenv').config();
const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const connectDB = require('./db/connect')
const express = require('express');
const productsRouter = require('./routes/products')

const app = express();
app.use(express.json());


//routes
app.get('/',(req,res)=>{
  res.send('you have hit home route')
})

app.use('/api/v1/products',productsRouter)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3000

const start = async ()=>{
  try{
    await connectDB(process.env.MONGO_URI)
    app.listen(port,console.log(`server running on ${port}`))
  }catch(err){
    console.log(err)
  }
}

start()