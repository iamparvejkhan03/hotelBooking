import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const navigation = [
    {name:'Dashboard', path:'/user/dashboard', icon:assets.dashboardIcon},
    {name:'My Bookings', path:'/user/my-bookings', icon:assets.totalBookingIcon},
];

function UserSidebar(){
    return (
        <aside className="border-r-2 border-r-blue-100 w-1/6">
            <nav>
                <ul>
                    {
                        navigation.map((link, i) => (
                            <li key={i}>
                                <NavLink to={link.path} className={({isActive}) => `px-1 py-2 md:py-3 md:px-5 flex justify-center md:justify-start items-center ${isActive && 'bg-blue-200 text-blue-500 border-r-3 border-r-blue-400'}`}>
                                    <img src={link.icon} alt={link.name} className="inline mr-1 min-w-5" /> 
                                    <span className="hidden md:block">{link.name}</span>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </aside>
    );
}

export default UserSidebar;