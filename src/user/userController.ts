
import { Request,Response,NextFunction } from "express"
import createHttpError from "http-errors";
import userModel from "./userModel";

const createUser=async (req:Request,res:Response,next:NextFunction)=>{
    const { name,email,password }=req.body;

    // 1.validation
    if(!name || !email ||!password)
    {
        const error=createHttpError(400,"All the field are required ");
        return next(error);
    }
    const user= await userModel.findOne({email});
    if(user)
    {
        const error=createHttpError(400,"user already exist with same email");
        return next(error);
    }
    // 2.logic/prcoess
    // 3.response



     res.json({
        "message":"user registered"
     });
}

export {createUser};