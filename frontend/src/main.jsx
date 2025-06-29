import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { About, Contact, GoogleOAuth, Home, Privacy, ResetPassword, Room, Rooms } from './pages';
import { OwnerDashboard, OwnerLayout, OwnerAllRooms, OwnerAddRoom, OwnerHotel } from './pages/owner';
import { UserLayout, UserDashboard, UserBookings, UserProfile } from './pages/user';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import {Protected} from './components';

createRoot(document.getElementById('root')).render(
    // <StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<App />} path='/'>
                            <Route element={<Home />} path='' />
                            <Route element={<Rooms />} path='/rooms' />
                            <Route element={<Room />} path='/room/:id' />
                            <Route element={<About />} path='/about' />
                            <Route element={<Contact />} path='/contact' />
                            <Route element={<Privacy />} path='/privacy' />
                            <Route element={<ResetPassword />} path='/reset-password' />
                            <Route element={<GoogleOAuth />} path='/google-oauth' />
                            <Route element={<OwnerLayout />} path='/owner'>
                                <Route element={<Protected authetication={true}><OwnerDashboard /></Protected>} path='/owner/dashboard' index />
                                <Route element={<Protected authetication={true}><OwnerAllRooms /></Protected>} path='/owner/all-rooms' />
                                <Route element={<Protected authetication={true}><OwnerAddRoom /></Protected>} path='/owner/add-room' />
                                <Route element={<Protected authetication={true}><OwnerHotel /></Protected>} path='/owner/hotel' />
                            </Route>
                            <Route element={<UserLayout />} path='/user'>
                                <Route element={<Protected authetication={true}><UserDashboard /></Protected>} path='/user/dashboard' />
                                <Route element={<Protected authetication={true}><UserBookings /></Protected>} path='/user/my-bookings' />
                                <Route element={<Protected authetication={true}><UserProfile /></Protected>} path='/user/profile' />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    // </StrictMode>
)