import { Outlet, useLocation } from "react-router-dom";
import { Header, Footer, ScrollToTop, HotelRegForm, UserAuth } from "./components";
import { useState } from "react";
import { useSelector } from "react-redux";

function App(){
    const {pathname} = useLocation();
    const showUserAuth = useSelector(state => state.user.showUserAuthForm);
    const showRegForm = useSelector(state => state.hotel.showHotelRegForm);

    return (
        <main>
            <ScrollToTop />
            {showRegForm && <HotelRegForm />}
            {showUserAuth && <UserAuth />}
            {(!pathname.includes('owner') && !pathname.includes('/user')) && <Header />}
            <Outlet />
            <Footer />
        </main>
    );
}

export default App;