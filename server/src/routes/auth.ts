import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import { UserModel } from '../models/User.js';
import mongoose from 'mongoose';
import {z} from 'zod'
import authenticateUser from '../middlware/authUser.js';
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcrypt"
const SECRET :string = "someranw582er0948doimje509345brigh"

interface CustomRequest extends Request {
    user: any; // Define the user object type here
}


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

router.post("/register",UserValidation,async(req:Request,res:Response)=>{
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

        const data = {
            user:{
                id:userExits.id
            }
        }
        const authToken = jsonwebtoken.sign(data,SECRET);
        res.json({authToken})

    }
    catch(error){
        console.error(error)
    }
});

router.get("/me",authenticateUser,async(req:CustomRequest,res:Response)=>{
    try {
        
        const id = req.user.id;
        const userFound = await UserModel.findById(id).select("-password");

        res.send(userFound)
    } catch (error) {
        console.log("Does this really matter")
    }
})

export default router


