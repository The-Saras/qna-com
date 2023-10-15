import { error } from "console";
import { NextFunction,Request,Response } from "express"
import jsonwebtoken from "jsonwebtoken"

const SECRET :string = "someranw582er0948doimje509345brigh"

export const authenticateJWT = (req:Request,res:Response,next:NextFunction) =>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        jsonwebtoken.verify(authHeader,SECRET,(err,user)=>{
            if(err){
                return res.sendStatus(403)
            }
            if(!user){
                return res.sendStatus(403)
            }
            if(typeof user ==="string"){
                return res.sendStatus(403)
            }
            req.headers['userId'] = user.id
            next()
        })
    }
}