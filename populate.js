require('dotenv').config();
const connectDB = require('./db/connect');
const { deleteMany } = require('./models/product');
const Product = require('./models/product');
const productsJson = require('./products.json');


const start = async()=>{
  try{
    await connectDB(process.env.MONGO_URI)
    await Product.deleteMany()
    await Product.create(productsJson)
    console.log('populated the db')
    process.exit(0);
  }catch(err){
    console.log(err)
    process.exit(1);
  }
}

start();

