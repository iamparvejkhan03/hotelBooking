import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Home} from './pages';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<App />} path='/'>
                    <Route element={<Home />} path='' />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)