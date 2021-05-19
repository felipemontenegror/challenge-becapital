const express = require('express')
const User = require('../../models/user')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const MSGS = require('../../messages')

// Route    GET /user
// @access   Private
router.get('/', async (req, res, next) => {
    try {
      const user = await User.find({})
      res.json(user)
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }
  })


  router.post('/',[
    check('name').not().isEmpty(),
    check('email', 'email is not valid').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min : 6}),
  ], async (req, res, next) => {
    try{
      let { name, email, password } = req.body

      const errors = validationResult(req)  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }else{
        let user = new User({name, email, password })      
        await user.save()
        if (user.id){
          res.json(user);
        }
      };
      
    }catch(err){
      console.error(err.message)
      res.status(500).send({"error" : MSGS.GENERIC_ERROR })
    }
  })
  


  module.exports = router