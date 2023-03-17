import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

//to handle errors throught middleware
import 'express-async-errors'

// db and authenticateUser
import connectDB from './db/connect';

// middlewares
import errorHandlerMiddleware from './middleware/error-handler';

app.use(express.json());


app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL || '');
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    } catch (error) {
        console.log('error connecting to database: ', error);
    }
};
start()