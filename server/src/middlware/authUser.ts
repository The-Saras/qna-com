import { NextFunction,Request,Response } from "express"
import jsonwebtoken from "jsonwebtoken"
const SECRET :string = "someranw582er0948doimje509345brigh"
interface CustomRequest extends Request {
    user: any; // Define the user object type here
}

const authenticateUser = (req:CustomRequest,res:Response,next:NextFunction)=>{
    const token: string| undefined = req.header("auth-token");
    if(!token){
        res.status(401).send({error:"Please authenticate with right token"});

    }
    try {
        const data = jsonwebtoken.verify(token,SECRET)as { user: any };
        req.user = data.user
        next();
    } catch (error) {
        console.error(error)
    }
}
export default authenticateUser