import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

export interface User extends mongoose.Document{
    name:string,
    email:string,
    password:string
}

export const UserModel = mongoose.model<User>('User',UserSchema);