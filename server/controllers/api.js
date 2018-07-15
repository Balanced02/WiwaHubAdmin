import Product from '../models/Products'

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
  let user = req.headers.user
  let productDetails = req.body
  Product.create({...productDetails, username: user._id}).then(data => res.json(data)).catch(err => res.status(500).json({ err: err, message: err.message }))
}
