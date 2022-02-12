
const getAllProductsStatic = async(req,res)=>{
  throw new Error('testing async errors')
  res.status(200).json({
    msg:'products tesing'
  })
}

const getAllProducts = async(req,res)=>{
  res.status(200).json({msg:'products route'})
}

module.exports = {
  getAllProductsStatic,
  getAllProducts
}