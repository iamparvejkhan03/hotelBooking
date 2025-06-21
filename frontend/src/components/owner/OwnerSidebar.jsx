import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const navigation = [
    {name:'Dashboard', path:'/owner', icon:assets.dashboardIcon},
    {name:'Add Room', path:'/add-room', icon:assets.addIcon},
    {name:'List Room', path:'/list-room', icon:assets.listIcon},
];

function OwnerSidebar(){

    return (
        <aside className="border-r-2 border-r-blue-100 w-1/7">
            <nav>
                <ul>
                    {
                        navigation.map((link, i) => (
                            <li key={i}>
                                <NavLink to={link.path} className={({isActive}) => `py-3 px-5 flex items-center ${isActive && 'bg-blue-200 text-blue-500 border-r-3 border-r-blue-400'}`}>
                                    <img src={link.icon} alt={link.name} className="inline mr-1" /> 
                                    <span>{link.name}</span>
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