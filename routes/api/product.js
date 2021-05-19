const express = require('express')
const Product = require('../../models/product.js')
const { check, validationResult } = require('express-validator')
const MSGS = require('../../messages')
const router = express.Router()


//Route GET || Create Product
// Acess Public
router.get('/', async (req, res) => {
    try {
      const product = await Product.find({})
      res.json(product)
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error" : MSGS.GENERIC_ERROR })
    }
  })


//Route GET || GET:Id
// Acess Public
router.get('/:id',[], async (req, res) => {
    try {
      const id = req.params.id
      const product = await Product.findOne({_id : id})
      if(product){
        res.json(product)
      } else {
          res.status(404).send({ "error" : MSGS.PRODUCT404})
      }
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error" : MSGS.GENERIC_ERROR })
    }
  })

  
//Route Post || Create Product
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
      res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }
  })


//Route Patch || PATCH:id Product
// Acess Public
  router.patch('/:id', async (req, res, next) => {  
    try {
      const id = req.params.id
      const update = { $set: req.body } // operador $set de update de valor
      const product = await Product.findByIdAndUpdate(id, update, { new: true })
      if (product) {
        res.send(product)
      } else {
        res.status(404).send({ error: "Product doesn't exist" })
      }
    }catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": "Server Error" })
    }
  });


//Route Delete || DELETE Product
// Acess Public
  router.delete('/:id', [], async (req, res, next) => {
    try {
      const id = req.params.id
      const product = await Product.findOneAndDelete({_id: id })
      if (product) {
        res.send(product)
      } else {
        res.status(404).send({ "error": MSGS.PRODUCT404 })
      }
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }
  })

  module.exports = router