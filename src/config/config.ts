import { config as configure } from "dotenv";
configure();

const _config={
    port:process.env.PORT,
}

export const config=Object.freeze(_config);
