import { Outlet } from "react-router-dom";
import { OwnerHeader } from "../../components";

function OwnerLayout(){
    return (
        <main>
            <OwnerHeader />
            <Outlet />
        </main>
    );
}

export default OwnerLayout;