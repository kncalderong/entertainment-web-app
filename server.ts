import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

//to handle errors throught middleware
import 'express-async-errors'

//to secure some general vulnerabilities that could have a backend
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

// db and authenticateUser
import connectDB from './db/connect';

//to get the cookies info in the  requests
import cookieParser from 'cookie-parser'

// routers
import authRouter from './routes/authRoutes';
import motionPictureRouter from './routes/motionPictureRoutes';

// middlewares
import errorHandlerMiddleware from './middleware/error-handler';
import notFoundMiddleware from './middleware/not-found';

app.use(express.json()); //to allow reading body in json format
app.use(cookieParser())

app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/motion-picture', motionPictureRouter)

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