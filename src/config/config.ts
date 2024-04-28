import { config as configure } from "dotenv";
configure();

const _config={
    port:process.env.PORT,
    mongo_uri:process.env.MONGO_URI,
    env:process.env.ENV,
    jwt_secret:process.env.JWT_SECRET,
    
}

export const config=Object.freeze(_config);
