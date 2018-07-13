import regeneratorRuntime from "regenerator-runtime";
import Products from "../models/Products";

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
