import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard, faAdd, faList, faTableList, faHotel } from "@fortawesome/free-solid-svg-icons";

const navigation = [
    {name:'Dashboard', path:'/owner/dashboard', icon:faDashboard},
    {name:'Add Room', path:'/owner/add-room', icon:faAdd},
    {name:'All Rooms', path:'/owner/all-rooms', icon:faTableList},
    {name:'Hotel', path:'/owner/hotel', icon:faHotel},
];

function OwnerSidebar(){
    return (
        <aside className="border-r-2 border-r-blue-100 min-w-1/6 md:w-1/7">
            <nav>
                <ul>
                    {
                        navigation.map((link, i) => (
                            <li key={i}>
                                <NavLink to={link.path} className={({isActive}) => `px- py-3 md:py-3 md:px-5 flex justify-center md:justify-start items-center gap-2 ${isActive && 'bg-blue-200 text-blue-500 border-r-3 border-r-blue-400'}`}>
                                    {/* <img src={link.icon} alt={link.name} className="inline mr-1 min-h-5" />  */}
                                    <FontAwesomeIcon icon={link.icon} className="text-lg" />
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

export default OwnerSidebar;