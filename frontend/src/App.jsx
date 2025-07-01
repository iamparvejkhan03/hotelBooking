import { Outlet, useLocation } from "react-router-dom";
import { Header, Footer, ScrollToTop, HotelRegForm, UserAuth, ScrollToTopIcon } from "./components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

function App(){
    const {pathname} = useLocation();
    const showUserAuth = useSelector(state => state.user.showUserAuthForm);
    const showRegForm = useSelector(state => state.hotel.showHotelRegForm);

    return (
        <main>
            <ScrollToTop />
            <Toaster />
            {showRegForm && <HotelRegForm />}
            {showUserAuth && <UserAuth />}
            {(!pathname.includes('owner') && !pathname.includes('/user')) && <Header />}
            <Outlet />
            <ScrollToTopIcon />
            <Footer />
        </main>
    );
}

export default App;