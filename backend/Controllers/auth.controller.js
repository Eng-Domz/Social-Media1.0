const jwt = require('jsonwebtoken');
const User = require('../Models/user.model');
const bcrypt = require('bcrypt');
exports.login = async (req, res,next) => {
    try{
        const {name, password} = req.body;
        const user = await User.findOne({name});
        if(!user){
            return res.status(401).json({message: 'Invalid credentials (Did not find name)'});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: 'Invalid credentials (Did not find password)'});
        }
        const token = jwt.sign({userId: user._id}, process.env.SECRET);
        res.status(200).json({token,user});
    }catch(error){
        next(error);
    }
}

exports.getAllUsers = async (req, res,next) => {
    try{
        const users = await User.find();
        res.status(200).json({users});
    }catch(error){
        next(error);
    }
}

exports.register = async (req, res,next) => {
    try{
        const {name, password, profilePic} = req.body;
        const user = await User.create({name, password, profilePic});
        res.status(201).json({message: 'User created successfully', userId: user._id});
    }catch(error){
        next(error);
    }
}

exports.getUserById = async (req, res,next) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json({user});
    }catch(error){
        next(error);
    }
}

