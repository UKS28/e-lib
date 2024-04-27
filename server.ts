// console.log("hello world");
import app from "./src/app";
import { config } from "./src/config/config";

const startServer=()=>{
    // const PORT=process.env.PORT || 3000;
    const PORT=config.port||3000
    app.listen(PORT,()=>{
        console.log(`Server listening on Port ${PORT}`)
    })
}

startServer();