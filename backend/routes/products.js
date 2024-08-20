import { Router } from 'express';
import { Product } from '../Database/model.js';
import mongoose from 'mongoose';
const Decimal128 = mongoose.Types.Decimal128

const router = Router();

// const products = [
//   {
//     _id: 'fasdlk1j',
//     name: 'Stylish Backpack',
//     description:
//       'A stylish backpack for the modern women or men. It easily fits all your stuff.',
//     price: 79.99,
//     image: 'http://localhost:3100/images/product-backpack.jpg'
//   },
//   {
//     _id: 'asdgfs1',
//     name: 'Lovely Earrings',
//     description:
//       "How could a man resist these lovely earrings? Right - he couldn't.",
//     price: 129.59,
//     image: 'http://localhost:3100/images/product-earrings.jpg'
//   },
//   {
//     _id: 'askjll13',
//     name: 'Working MacBook',
//     description:
//       'Yes, you got that right - this MacBook has the old, working keyboard. Time to get it!',
//     price: 1799,
//     image: 'http://localhost:3100/images/product-macbook.jpg'
//   },
//   {
//     _id: 'sfhjk1lj21',
//     name: 'Red Purse',
//     description: 'A red purse. What is special about? It is red!',
//     price: 159.89,
//     image: 'http://localhost:3100/images/product-purse.jpg'
//   },
//   {
//     _id: 'lkljlkk11',
//     name: 'A T-Shirt',
//     description:
//       'Never be naked again! This T-Shirt can soon be yours. If you find that buy button.',
//     price: 39.99,
//     image: 'http://localhost:3100/images/product-shirt.jpg'
//   },
//   {
//     _id: 'sajlfjal11',
//     name: 'Cheap Watch',
//     description: 'It actually is not cheap. But a watch!',
//     price: 299.99,
//     image: 'http://localhost:3100/images/product-watch.jpg'
//   }
// ];

//Get list of products
router.get('/', async (req, res) => {
  // Return a list of dummy products
  // Later, this data will be fetched from MongoDB
  // const queryPage = req.query.page;
  // const pageSize = 5;
  // let resultProducts = [...products];
  // if (queryPage) {
  //   resultProducts = products.slice(
  //     (queryPage - 1) * pageSize,
  //     queryPage * pageSize
  //   );
  // }
  // res.json(resultProducts);

  try {
    //db.products.createIndex({ price: -1 });
    const pageNumber=parseInt(req.query.pageNumber)||1;
    const productItems = [];
    const totalProducts=await Product.find();
    const products = await Product.find().sort({price:1}).skip((pageNumber-1)*5).limit(5);
    products.forEach((productDoc) => {
      productItems.push({ ...productDoc.toObject(), price: productDoc.price.toString() });

    });
    console.log(Math.ceil(totalProducts.length/5))
    res.status(200).json({products:productItems,pageNumbers:(Math.ceil(totalProducts.length/5))})
  } catch (err) {
    res.status(500).json({ message: "cannot fetch the data" })
  }

});



// Get single product 
router.get('/:id', async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  const productdata = {...product.toObject(),price:product.price.toString()};
  console.log(productdata);
  res.json(productdata);
});

// Add new product
// Requires logged in user
router.post('/', async (req, res) => {
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    price: Decimal128.fromString(req.body.price.toString()), // store this as 128-bit decimal in MongoDB
    image: req.body.image
  };

  try {
    const data = await Product.create(newProduct);
    console.log(data._id);
    res.status(201).json({ message: 'Product added', productId: data._id });
  } catch (err) {
    res.status(500).json({ message: "Product is not added" });
  }

});

// Edit existing product
// Requires logged in user
router.patch('/:id', async(req, res) => {
  const updatedProduct = {
    name: req.body.name,
    description: req.body.description,
    price: Decimal128.fromString(req.body.price.toString()), // store this as 128-bit decimal in MongoDB
    image: req.body.image
  };

  try{
    const product=await Product.updateOne({_id:req.params.id},updatedProduct);
    console.log(product);
    res.status(200).json({ message: 'Product updated', productId: req.params.id });
  }catch(err){
    res.status(500).json({message:"unable to update"});
  }

});

// Delete a product
// Requires logged in user
router.delete('/:id', async(req, res) => {

  try{
    const product=await Product.deleteOne({_id:req.params.id});
    console.log(product);
    res.status(200).json({ message: 'Product deleted', productId: req.params.id });
  }catch(err){
    res.status(500).json({message:"unable to delete"});
  }

});

export default router;
