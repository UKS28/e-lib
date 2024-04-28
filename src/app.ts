import express from "express"
import globalErrorHandler from "./Middleware/globalErrorHandler";
import userRouter from "./user/userRouter";

const app=express();
// Json parser - req.body
app.use(express.json());
// routing
app.get('/',(req,res,next)=>{

    res.json({
        message:"hello from server",
    })
})

// error handling
app.use('/api/users',userRouter);

app.use(globalErrorHandler);

export default app;