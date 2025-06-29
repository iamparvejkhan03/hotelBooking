import { Outlet, useNavigate } from "react-router-dom";
import { OwnerHeader } from "../../components";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function OwnerLayout(){
    const isHotelOwner = useSelector(state => state.user.isHotelOwner);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!isHotelOwner){
            return navigate('/');
        }
    }, [])
    
    return (
        <main>
            <OwnerHeader />
            <Outlet />
        </main>
    );
}

export default OwnerLayout;