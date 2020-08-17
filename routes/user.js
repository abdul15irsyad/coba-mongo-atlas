const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/User')

router.get('/:id',(req,res)=>{
  try{
    let id = req.params.id
    User.findById(id,(err,user)=>{
      if(user){
        res.status(200).json({
          status: true,
          data: user
        })
      }else{
        res.status(200).json({
          status: false,
          message: "user not found !",
        })
      }
    })
  }catch(err){
    res.status(500).json({
      message:'interal server error !',
      error:err.message
    })
  }
})

router.get('/',(req,res)=>{
  try{
    let {page,perpage,sort} = req.query
    sort = sort == 'asc' ? 1 : sort == 'desc' ? -1 : sort
    User.paginate({},{
      pagination: page=="all" ? false : true,
      select: "-password",
      page: page ? parseInt(page,10) : 1,
      limit: perpage ? parseInt(perpage,10) : 10,
      sort: {
        name: parseInt(sort)
      }
    }).then(result=>{
      res.status(200).json({
        status: true,
        data: result
      })
    })
  }catch(err){
    res.status(500).json({
      message:'interal server error !',
      error:err.message
    })
  }
})

router.post('/',async (req,res)=>{
  try{
    User.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      hashedPassword: await bcrypt.hash(req.body.password,10),
    },(err,user)=>{
      if(user){
        res.status(200).json({
          status: true,
          data: user 
        })
      }else{
        res.status(200).json({
          status: false,
          message: err.message
        })
      }
    })
  }catch(err){
    res.status(500).json({
      message:'interal server error !',
      error:err.message
    })
  }
})

router.patch('/',async (req,res)=>{
  try{
    let id = req.query.id
    if(req.body.password) req.body.password = await bcrypt.hash(req.body.password,10)
    User.findByIdAndUpdate(id,{
      $set: req.body
    },async (err,user)=>{
      if(user){
        res.status(200).json({
          status: true,
          data: await User.findById(id)
        })
      }else{
        res.status(200).json({
          status: false,
          message: "user not found !"
        })
      }
    })
  }catch(err){
    res.status(500).json({
      message:'interal server error !',
      error:err.message
    })
  }
})

router.delete('/:id',(req,res)=>{
  try{
    let id = req.params.id
    User.findById(id,async (err,user)=>{
      if(user){
        res.status(200).json({
          status: true,
          message: "success delete user !",
          data: await User.findByIdAndRemove(id)
        })
      }else{
        res.status(200).json({
          status: false,
          message: "user not found !",
        })
      }
    })
  }catch(err){
    res.status(500).json({
      message:'interal server error !',
      error:err.message
    })
  }
})

module.exports = router