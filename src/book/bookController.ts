import { Request,Response,NextFunction } from "express"
import path from "node:path"
import cloudinary from "../config/cloudinary";
import createHttpError from "http-errors";
import bookModel from "./bookModel";
import fs from "node:fs"
import {AuthRequest} from "../Middleware/authenticate"

const createBook=async (req:Request,res:Response,next:NextFunction)=>{
    const { title, genre }=req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    console.log("files ",req.files);
    // console.log("userId", req);
    // coverImage
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    fileName
    );
    
    // Book file
    const bookFileName = files.file[0].filename;
    const bookFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFileName
    );
    

    try{
    // coverImage upload
       const uploadResult = await cloudinary.uploader.upload(filePath, {
        filename_override: fileName,
        folder: "book-covers",
        format: coverImageMimeType,
      });

    // Book file upload
      const bookFileUploadResult = await cloudinary.uploader.upload(
        bookFilePath,
        {
          resource_type: "raw",
          filename_override: bookFileName,
          folder: "book-pdfs",
          format: "pdf",
        }
      );
    
      console.log("bookFileUploadResult", bookFileUploadResult);
      console.log("uploadResult", uploadResult);
      
    //   create new book
    
      const _req = req as AuthRequest;
      const newBook = await bookModel.create({
        title,
        genre,
        author:_req.userId,
        coverImage: uploadResult.secure_url,
        file: bookFileUploadResult.secure_url,
      });

      //   delete the files in local machine
      await fs.promises.unlink(filePath);
      await fs.promises.unlink(bookFilePath);

      res.status(201).json({
        id:newBook._id,
        message:"Book created succesfully",
      })
    //   res.json({
    //     message:"file uploaded successfully"
    //   })


    }
    catch(error)
    {
        console.log(error);
        return next(createHttpError(500, "Error while uploading the files."));
    }
    
    

};

export {createBook};



