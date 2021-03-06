const express = require('express')
const User = require('../../models/user')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const MSGS = require('../../messages')

// Route  ||  GET /user
// Access   Public
router.get('/', async (req, res, next) => {
    try {
      const user = await User.find({})
      res.json(user)
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }
  })

// Route  ||  GET /user
// Access   Public
  router.get('/:userId', [], async(req, res, next)=> {  
    try{
      const id = req.params.userId
      const user = await User.findOne({_id : id}) 
      if(user){
        res.json(user)
      }else{
        res.status(404).send({"error" : MSGS.USER404})
      }
    }catch(err){
      console.error(err.message)
      res.status(500).send({"error" : MSGS.GENERIC_ERROR})
    }
  })

  
// Route  ||  DELETE /user
// Access   Public
  router.delete('/:userId', async(req, res, next)=> {
    try{
      const id = req.params.userId   
      const user = await User.findOneAndDelete({_id : id}) 
      if (user){
        res.json(user)
      }else{
        res.status(404).send({"error" : MSGS.USER404})
      }
    }catch(err){
      console.error(err.message)
      res.status(500).send({"error" : MSGS.GENERIC_ERROR})
    }
  })

// Route  ||  POST /user
// Access   Public
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
      }
      
    }catch(err){
      console.error(err.message)
      res.status(500).send({"error" : MSGS.GENERIC_ERROR })
    }
  })
  
  module.exports = router