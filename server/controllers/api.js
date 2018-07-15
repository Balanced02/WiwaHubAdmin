import Product from '../models/Products'

export const CreateProduct = (req, res) => {
  let user = req.headers.user
  let productDetails = req.body
  Product.create({...productDetails, username: user._id}).then(data => res.json(data)).catch(err => res.status(500).json({ err: err, message: err.message }))
}