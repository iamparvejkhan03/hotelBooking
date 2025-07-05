import express from 'express';
import userRouter from './routes/user.route.js';
import hotelRouter from './routes/hotel.route.js';
import roomRouter from './routes/room.route.js';
import newsletterRouter from './routes/newsletter.route.js';
import { contact } from './controllers/contact.controller.js';
import bookingRouter from './routes/booking.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({limit:'16kb'}));

app.get('/', (req, res) => res.send('You are in the right place.'));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/hotels', hotelRouter);
app.use('/api/v1/rooms', roomRouter);
app.use('/api/v1/newsletter', newsletterRouter);
app.post('/api/v1/contact', contact);
app.use('/api/v1/bookings', bookingRouter);

export default app;