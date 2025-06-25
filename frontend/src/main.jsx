import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {About, Contact, Home, Privacy, Room, Rooms} from './pages';
import {OwnerDashboard, OwnerLayout, OwnerAllRooms, OwnerAddRoom} from './pages/owner';
import {UserLayout, UserDashboard, UserBookings, UserProfile} from './pages/user';
import { Provider } from 'react-redux';
import store from './app/store.js';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route element={<App />} path='/'>
                        <Route element={<Home />} path='' />
                        <Route element={<Rooms />} path='/rooms' />
                        <Route element={<Room />} path='/room/:id' />
                        <Route element={<About />} path='/about' />
                        <Route element={<Contact />} path='/contact' />
                        <Route element={<Privacy />} path='/privacy' />
                        <Route element={<OwnerLayout />} path='/owner'>
                            <Route element={<OwnerDashboard />} path='/owner/dashboard' index />
                            <Route element={<OwnerAllRooms />} path='/owner/all-rooms' />
                            <Route element={<OwnerAddRoom />} path='/owner/add-room' />
                        </Route>
                        <Route element={<UserLayout />} path='/user'>
                            <Route element={<UserDashboard />} path='/user/dashboard' />
                            <Route element={<UserDashboard />} path='/user/dashboard' />
                            <Route element={<UserBookings />} path='/user/my-bookings' />
                            <Route element={<UserProfile />} path='/user/profile' />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>
)