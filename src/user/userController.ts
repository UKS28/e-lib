
import { Request,Response,NextFunction } from "express"
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";


const createUser=async (req:Request,res:Response,next:NextFunction)=>{
    const { name,email,password }=req.body;

    // 1.validation
    if(!name || !email ||!password)
    {
        const error=createHttpError(400,"All the field are required ");
        return next(error);
    }

    try{
        const user= await userModel.findOne({email});
        if(user)
        {
            const error=createHttpError(400,"user already exist with same email");
            return next(error);
        }
    }catch(err)
    {
        return next(createHttpError(500,"error occured while finding user"));
    }


    // 2.logic/prcoess
    const hashPassword=await bcrypt.hash(password,10);
    let newUser: User;
    try{
        newUser=await userModel.create({
            name,
            email,
            password:hashPassword
        });
    }
    catch(error)
    {
        return next(createHttpError(500,"Error occured while creating user"));
    }
   

    // 3.response
    try{
        const token=sign({ sub: newUser._id },config.jwt_secret as string,{
            expiresIn:"7d",
        });
         res.status(201).json({
            accessToken:token
         })
    }
    catch(err)
    {
        return next(createHttpError(500,"error occured while JWT token generation"));
    }
    //  res.json({
    //     "message":"user registered"
    //  });
}

const loginUser=async(req:Request,res:Response,next:NextFunction)=>{
    // extract email and password
    const { email, password }=req.body;
    if(!email || !password){
        return next(createHttpError(400,"email or password and provided"));
    }
    
    // find email
    const user=await userModel.findOne({email});

    // if not found
    if(!user){
        return next(createHttpError(404,"user not found"));
    }
   
    // comapre with the iven password
    const match=await bcrypt.compare(password,user.password);
    
    // if not match
    if(!match){
        return next(createHttpError(400,"incorrect password"));
    }

    // return jwt token
    
    const token=sign({ sub: user._id },config.jwt_secret as string,{
        expiresIn:"7d",
    });
     res.status(200).json({
        accessToken:token
     })

}

export {createUser,loginUser};