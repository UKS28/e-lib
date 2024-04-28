
import { Request,Response,NextFunction } from "express"

const createUser=(req:Request,res:Response,next:NextFunction)=>{

     res.json({
        "message":"user registered"
     });
}

export {createUser};