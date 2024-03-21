import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import { UserModel } from '../models/User.js';
import mongoose from 'mongoose';
import {z} from 'zod'
import { authenticateJWT } from '../middlware/authUser.js';

import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcrypt"
const SECRET :string = "someranw582er0948doimje509345brigh"




const userObject = z.object({
    name:z.string().min(3).max(20),
    email:z.string().email(),
    password:z.string().min(5).max(20)
});

const UserValidation = (req:Request,res:Response,next:NextFunction)=>{
    const {name,email,password} = req.body;
    const validationResult = userObject.safeParse({name,email,password});
    if(validationResult.success){
        next();
    }
    else{
        res.status(400).json({message:"Some error try again you idiot"})
    }

}

router.post("/register",UserValidation,async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const salt = await bcrypt.genSalt(10);

        const secPass = await bcrypt.hash(password, salt)
        let userExits = await UserModel.findOne({email:email});
        if (userExits) {
            return res.status(400).json({ error: "Emial already in use" })
        }
        userExits = await UserModel.create({
            name:name,
            email:email,
            password:secPass
        });

        
        const authToken = jsonwebtoken.sign({id:userExits._id},SECRET);
        res.json({authToken})

    }
    catch(error){
        console.error(error)
    }
});

router.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        let fuser = await UserModel.findOne({email});
        if(!fuser){
            return res.status(400).json({error:"Enter valid details"});

        }
        const passwordCompare = bcrypt.compare(password,fuser.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Enter valid details" });

        }
        const authToken = jsonwebtoken.sign({id:fuser.id}, SECRET);
        res.json({ authToken });

    } catch (error) {
        console.error(error)
    }
})

router.get("/me",authenticateJWT,async(req,res)=>{
    const usreId = req.headers['userId'];
    const user = await UserModel.findOne({_id:usreId}).select("-password");
    if(user){
        return res.json(user);
    }
    else{
        res.status(403).json({message:"User not logged in!"})
    }
})



export default router


