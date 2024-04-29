import { Request,Response,NextFunction } from "express"
import createHttpError from "http-errors";
import { config } from "../config/config";
import { verify } from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId: string;
}

const authenticate= (req:Request,res:Response,next:NextFunction)=>{
    const token=req.header("Authorization");

    if(!token)
    {
        return next(createHttpError(401,"unauthorized user"));
    }
    
    try{
        const parsed_token=token.split(' ')[1];
        const decoded = verify(parsed_token, config.jwt_secret as string);
        const _req=req as AuthRequest;
        _req.userId=decoded.sub as string;
        next();

    }catch(err)
    {
        return next(createHttpError(500,"Token expired"));
    }


}

export default authenticate;
