import { Outlet } from 'react-router-dom';
import { UserHeader } from '../../components'

function UserLayout(){
    return (
        <>
            <UserHeader />
            <Outlet />
        </>
    );
}

export default UserLayout;