import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {About, Contact, Home, Privacy, Room, Rooms} from './pages';
import {OwnerDashboard, OwnerLayout} from './pages/owner';

createRoot(document.getElementById('root')).render(
    <StrictMode>
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
                        <Route element={<OwnerDashboard />} path='' index />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)