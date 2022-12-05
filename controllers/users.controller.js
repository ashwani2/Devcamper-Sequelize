const db=require('../models/index')
const User = db.users
const asyncHandler = require("../middleware/async");

//@desc     Get all users
//@route    POST /api/v1/auth/users
//@access   Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
   res.status(200).json(res.advancedResults)
  });

//@desc     Get a single user
//@route    GET /api/v1/auth/users/:id
//@access   Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {

    const user = await User.findOne({where:{_id:req.params.id}})  
    res.status(200).json({
      success: true,
      data:user
    });
  });  


//@desc     Create a user
//@route    POST /api/v1/auth/users/
//@access   Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {

    const user = await User.create(req.body)

    res.status(201).json({
      success: true,
      data:user
    });
  });  

//@desc     Update user
//@route    PUT /api/v1/auth/users/:id
//@access   Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {

    const user = await User.update(req.body,{
        where:{_id:req.params.id}
    })

    res.status(200).json({
      success: true,
      data:user
    });
  });  

//@desc     Delete user
//@route    DELETE /api/v1/auth/users/:id
//@access   Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {

    await User.destroy({where:{_id:req.params.id}})

    res.status(200).json({
      success: true,
      data:[]
    });
  });   