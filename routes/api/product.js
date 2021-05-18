const express = require('express')
const Product = require('../../models/product.js')
const { check, validationResult } = require('express-validator');
const router = express.Router()


//Router Post || Create Product
// Acess Public
router.post('/', [
    check('serial').not().isEmpty(),
    check('company').not().isEmpty(),
    check('description').not().isEmpty(),
    check('price').not().isEmpty(),
  ], async (req, res, next) => {

    try {
      let { serial, company, description, price } = req.body
  
      const errors = validationResult(req)
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      } else {
        let product = new Product({ serial, company, description, price })
        
        await product.save()
  
        if (product.id) {
          res.json(product)
        }
      }
    } catch (err) {
      console.log(err.message)
      res.status(500).send({ "error": "Server Error" })
    }
  })

  module.exports = router