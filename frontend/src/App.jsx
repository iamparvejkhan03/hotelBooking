import { Outlet, useLocation } from "react-router-dom";
import { Header, Footer, ScrollToTop, HotelRegForm, UserAuth } from "./components";
import { useState } from "react";

function App(){
    const {pathname} = useLocation();
    const [showRegForm, setShowRegForm] = useState(false);
    const [showUserAuth, setShowUserAuth] = useState(false);

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