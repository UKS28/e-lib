import { config as configure } from "dotenv";
configure();

const _config={
    port:process.env.PORT,
    mongo_uri:process.env.MONGO_URI,
}

export const config=Object.freeze(_config);
