import regeneratorRuntime from "regenerator-runtime"
import Product from '../models/Products'
import Users from '../models/Users'

export const ChangePremium = (req, res) => {
  let id = req.params.id;
  let { premium } = req.body;
  Products.findOneAndUpdate(
    {
      _id: id
    },
    {
      $set: {
        premium
      }
    },
    {
      new: true
    }
  )
    .then(data => res.json(data))
    .catch(err =>
      res.status(500).json({
        message: err.message
      })
    );
};

export const CreateProduct = (req, res) => {
  let user = JSON.parse(req.headers.user)
  let productDetails = req.body
  Product.create({...productDetails, username: user.sid})
    .then(data => res.json(data))
    .catch(err => {
      console.log(err)
      res.status(500).json({ err: err, message: err.message })})
}

export const GetProducts = async (req, res) => {
  let page = parseInt(Number(req.params.id)) 
  if (!page) {
    page = 1
  }
  try {
    let [count, products] = await Promise.all([
      Product.find().count(),
      Product.find()
      .sort('name')
      .skip(page * 25 - 25)
      .limit(25),
    ])
    let username = await Users.find({
      sid: {
        $in: products.map(product => product.username)
      }
    },
    'username phoneNumber sid'
  )
  products = products.map(product => {
    let userName = username.filter(user => user.sid === product.username)[0]
    console.log(userName)
    product._doc.username = userName ? userName.username : ''
    product._doc.phoneNumber = userName ? userName.phoneNumber : ''
    return product
  })

    return res.json({
      count,
      products,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Error Loading Product List',
      error: err.message,
    })
  }

}