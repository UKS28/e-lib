import express from "express"
import globalErrorHandler from "./Middleware/globalErrorHandler";

const app=express();

// routing
app.get('/',(req,res,next)=>{

    res.json({
        message:"hello from server",
    })
})

// error handling
app.use(globalErrorHandler);

export default app;