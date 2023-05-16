import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

//to handle errors throught middleware
import 'express-async-errors'

//to redirect front build to our server side rendering correct path
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

//to secure some general vulnerabilities that could have a backend
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

// db and authenticateUser
import connectDB from 'db/connect.js';

//to get the cookies info in the  requests
import cookieParser from 'cookie-parser'

// routers
import authRouter from 'routes/authRoutes.js';
import motionPictureRouter from './routes/motionPictureRoutes.js';

// middlewares
import errorHandlerMiddleware from 'middleware/error-handler.js';
import notFoundMiddleware from 'middleware/not-found.js';

/* const __dirname = dirname(fileURLToPath(import.meta.url)); */

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, '../client/dist'))); //this middlewere allows access to all static files

app.use(express.json()); //to allow reading body in json format
app.use(cookieParser())

app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/motion-picture', motionPictureRouter)

// only when ready to deploy
app.get('*', (req, res) => { //this middleware allows me to handle every possible route in the front end through the index.html, but it always must be called after my server routes (the above ones)
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});


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