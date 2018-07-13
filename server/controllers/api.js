import Products from '../models/Products'

export const CreateProduct = (req, res) => {
  const { username, product, location, title } = req.body;
  Products.create({ username, product, location, title })
    .then(data =>
      res.json({
        data,
        message: "Successfully Created"
      })
    )
    .catch(err =>
      res.status(500).json({
        message: err.message
      })
    );
};