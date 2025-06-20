import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Home, Room, Rooms} from './pages';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<App />} path='/'>
                    <Route element={<Home />} path='' />
                    <Route element={<Rooms />} path='/rooms' />
                    <Route element={<Room />} path='/room/:id' />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)