import { assets } from "../../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

function UserHeader(){
    const [showUserMenu, setShowUserMenu] = useState(false);

    const user = useSelector(state => state.user.user);

    console.log(user)

    return (
        <header className="flex w-full py-4 px-10 justify-between border-b border-b-blue-100">
            <Link to="/" className="w-full">
                <img src={assets.logo} alt="logo" className="h-9 md:h-10 lg:h-14 invert" />
            </Link>
            
            <div className="relative w-full">
                <FontAwesomeIcon icon={faUser} className="text-xl text-black p-2 cursor-pointer hover:text-gray-600 transition-colors duration-200 float-end" onClick={() => setShowUserMenu(!showUserMenu)} />

                <div className={`${!showUserMenu && 'hidden'} absolute right-0 top-full bg-white border-2 border-blue-100 rounded drop-shadow-md drop-shadow-blue-200`} onClick={() => setShowUserMenu(!showUserMenu)}>
                    <ul className="py-4">
                        <li>
                            <Link to="/user/profile" className="flex gap-2 items-center cursor-pointer px-5 py-1">
                                <FontAwesomeIcon icon={faUser} />
                                <span>{user.fullName || 'User'}</span>
                            </Link>
                        </li>
                        <li className="flex gap-2 items-center cursor-pointer px-5 py-1">
                            <FontAwesomeIcon icon={faSignOut} />
                            <span>Log Out</span>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default UserHeader;