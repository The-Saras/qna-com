import * as mongoose from 'mongoose';
import { User } from './User.js';

const Question = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    upvotes:{
        type:Number
    }
})

export interface Que extends mongoose.Document{
    text:string,
    upvotes:number
}

const qnaSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    questions:[{type:mongoose.Schema.Types.ObjectId,ref:"Question"}]
});

export interface Qna extends mongoose.Document{
    name:string,
    createdBy:User,
    questions:Que[]
}


export const QuesstionModel = mongoose.model<Que>('Question',Question);
export const QnaModel = mongoose.model<Qna>('Qna',qnaSchema);