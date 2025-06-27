import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOut, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsUserLoggedIn, updateUser } from "../../features/forms/UserAuthSlice";
import toast from "react-hot-toast";
import axios from "axios";

function OwnerHeader(){
    const [showUserMenu, setShowUserMenu] = useState(false);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const { data } = await axios.get('/api/v1/users/logout', {headers: {Authorization: `Bearer ${user.accessToken}`}});

            if(data){
                dispatch(toggleIsUserLoggedIn(false));
                dispatch(updateUser({}));
                navigate('/');
                toast.success(data.message);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <header className="flex w-full py-4 px-10 justify-between items-center border-b border-b-blue-100">
            <Link to="/" className="w-full">
                <img src={assets.logo} alt="logo" className="h-9 md:h-10 lg:h-12 invert" />
            </Link>

            <div className="relative w-full">
                {
                    !user.image
                    ?
                    (<FontAwesomeIcon icon={faUserCircle} className="text-xl text-black p-2 cursor-pointer hover:text-gray-600 transition-colors duration-200 float-end" onClick={() => setShowUserMenu(!showUserMenu)} />)
                    :
                    (<img src={user.image} alt="userImg" className="h-10 w-10 object-cover rounded-full float-end border-2 border-blue-200 cursor-pointer" onClick={() => setShowUserMenu(!showUserMenu)} />)
                }

                <div className={`${!showUserMenu && 'hidden'} absolute right-0 top-full bg-white border-2 border-blue-100 rounded drop-shadow-md drop-shadow-blue-200`} onClick={() => setShowUserMenu(!showUserMenu)}>
                    <ul className="py-4">
                        <li>
                            <Link to="/user/profile" className="flex gap-2 items-center cursor-pointer px-5 py-1">
                                <FontAwesomeIcon icon={faUser} />
                                <span>{user.fullName || 'User'}</span>
                            </Link>
                        </li>
                        <li className="flex gap-2 items-center cursor-pointer px-5 py-1" onClick={logoutHandler}>
                            <FontAwesomeIcon icon={faSignOut} />
                            <span>Log Out</span>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default OwnerHeader;