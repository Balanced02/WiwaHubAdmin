import regeneratorRuntime from "regenerator-runtime";
import Products from "../models/Products";

export const CreateProduct = (req, res) => {
  const { username, product, location, title } = req.body;
  Products.create({ username, product, location, title })
    .then(data =>
      res.json({
        message: "Successfully Created"
      })
    )
    .catch(err =>
      res.status(500).json({
        message: err.message
      })
    );
};

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
