const Product = require('../models/product')



const getAllProductsStatic = async(req,res)=>{
  const search = 'ab'
  const products = await Product.find({}).sort('-name price')
  res.status(200).json({products,numberOfProducts:products.length})
}

const getAllProducts = async(req,res)=>{
  const {featured,company,name,fields,sort,page,numericFilters}=req.query;
  let limit=Number(req.query.limit) || 10;
  const queryObject = {}
  let sortBy = 'createdAt';

  console.log(req.query.page)

  if(featured){
    queryObject.featured = (featured === 'true')? true:false
  }
  if(company){
    queryObject.company = company
  }
  if(name){
    queryObject.name = {$regex:name, $options:'i'}
  }
  if(numericFilters){
    const operatorMap = {
      '>':'$gt',
      '>=':'$gte',
      '=':'$eq',
      '<':'$lt',
      '<=':'$lte',
    }
    const regEx = /\b(<|<=|=|>|>=)\b/g
    let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
    const options = ['price','rating']
    console.log(filters)
    filters.split(',').forEach(item=>{
      const [field,operator,value]=item.split('-')
      if(options.includes(field)){
        queryObject[field]={[operator]:Number(value)}
      }
    })
    console.log(filters)
    console.log(queryObject)
  }
  let result =  Product.find(queryObject)
  if(fields){
    result = result.select(fields.split(',').join(' '))
  }
  if(sort){
    sortBy = sort.split(',').join(' ')
  }
  if(page){
    result = result.skip((page-1)*limit).limit(limit)
  }
  
  result = result.sort(sortBy);
  const products = await result;
  res.status(200).json({numberOfProducts:products.length,products})
}

module.exports = {
  getAllProductsStatic,
  getAllProducts
}