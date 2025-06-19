import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";

function App(){
    return (
        <main>
            <Header />
            <Outlet />
            <Footer />
        </main>
    );
}

export default App;