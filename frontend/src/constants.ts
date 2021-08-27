/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import env from "react-dotenv";

let apiBaseUrl = "localhost:3001/api"; 

if (process.env.NODE_ENV === 'production') {
    apiBaseUrl = env.DATABASE_URL;
}
apiBaseUrl = env.DATABASE_URL;
export { apiBaseUrl }; 
