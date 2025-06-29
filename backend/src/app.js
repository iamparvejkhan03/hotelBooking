import express from 'express';
import userRouter from './routes/user.route.js';
import hotelRouter from './routes/hotel.route.js';
import roomRouter from './routes/room.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({limit:'16kb'}));

app.get('/', (req, res) => res.send('You are in the right place.'));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/hotels', hotelRouter);
app.use('/api/v1/rooms', roomRouter);

export default app;