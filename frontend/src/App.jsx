import { Outlet, useLocation } from "react-router-dom";
import { Header, Footer, ScrollToTop } from "./components";

function App(){
    const {pathname} = useLocation();
    return (
        <main>
            <ScrollToTop />
            {!pathname.includes('owner') && <Header />}
            <Outlet />
            <Footer />
        </main>
    );
}

export default App;