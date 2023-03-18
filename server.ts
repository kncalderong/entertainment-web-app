import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

//to handle errors throught middleware
import 'express-async-errors'

// db and authenticateUser
import connectDB from './db/connect';

//to get the cookies info in the  requests
import cookieParser from 'cookie-parser'

// routers
import authRouter from './routes/authRoutes';

// middlewares
import errorHandlerMiddleware from './middleware/error-handler';
import notFoundMiddleware from './middleware/not-found';

app.use(express.json()); //to allow reading body in json format
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)

app.use(notFoundMiddleware)
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