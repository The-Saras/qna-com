import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import {z} from "zod"
import { authenticateJWT } from '../middlware/authUser.js';
import { QuesstionModel,QnaModel } from '../models/Qna.js';
import { UserModel } from '../models/User.js';


const qModel = z.object({
    name:z.string().min(5)
})

const qnaModel = z.object({
    name:z.string().min(5),
    

})

const QnaValidation = (req:Request,res:Response,next:NextFunction)=>{
    const {name} = req.body;
    const validationResult = qnaModel.safeParse({name});
    if(validationResult.success){
        next();
    }
    else{
        res.status(400).json({message:"Some error try again you idiot"})
    }

}


router.post("/createqna",authenticateJWT,QnaValidation,async(req,res)=>{
    const {name} = req.body
    let createdByAdmin = req.headers['userId'];
    //console.log(typeof(createdByAdmin))
    var Qna = await QnaModel.create({
        name:name,
        createdBy:createdByAdmin
    });

    res.json({Qna})

});
router.put("/upvote/:qid",authenticateJWT,async(req,res)=>{
    try{
        const qid = req.params.qid;
        QuesstionModel.updateOne({_id:qid},{$inc:{upvotes:1}})
        .then(()=>{
            
            return res.json({msg:"success"})
        }).catch((err)=>{
            console.log(err)
        })
    }
    catch(err){
        console.log(err)
    }
})

router.post("/createque/:location",authenticateJWT,async(req,res)=>{
    const {text} = req.body;
    const locationId = req.params.location

    const QueToUpload = await QnaModel.findById(locationId);
    if(!QueToUpload){
        return res.status(400).send({err:"Qna not found"});

    }
    const QueAsked = await QuesstionModel.create({text:text});
    QueToUpload.questions.push(QueAsked)
    QueToUpload.save()
    res.json({ QueAsked });
});



router.get("/allqna",authenticateJWT,async(req,res)=>{
    try {
        const allQnas = await QnaModel.find().populate({path:"createdBy",select:"name"}).select("-questions");
        res.json({allQnas});    
        
    } catch (error) {
        console.log(error)
    }
    
})

router.get("/getallque/:id",authenticateJWT,async(req,res)=>{
    const qnaId = req.params.id
    
    const QuestionsInArray= await QnaModel.findById(qnaId).populate({
        path: 'questions',
        options: { sort: { upvotes: -1 } } // Sort questions by upvotes in ascending order
    }).select('questions -_id');
    res.json({QuestionsInArray});

})

export default router