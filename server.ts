// console.log("hello world");
import app from "./src/app";
import { config } from "./src/config/config";
import connectDB from "./src/config/db";

const startServer= async()=>{
    // const PORT=process.env.PORT || 3000;
    await connectDB();
    const PORT=config.port||3000
    app.listen(PORT,()=>{
        console.log(`Server listening on Port ${PORT}`)
    })
}

startServer();