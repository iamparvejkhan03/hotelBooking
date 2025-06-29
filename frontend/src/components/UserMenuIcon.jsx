import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faSignOut, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toggleIsUserLoggedIn, updateUser } from "../features/forms/UserAuthSlice.js";
import toast from "react-hot-toast";
import axios from "axios";
import { toggleShowHotelRegForm, updateHotel } from "../features/forms/HotelRegSlice.js";

function UserMenuIcon() {
    const [showUserMenu, setShowUserMenu] = useState(false);

    const user = useSelector(state => state.user.user);
    const isHotelOwner = useSelector(state => state.user.isHotelOwner);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const { data } = await axios.get('/api/v1/users/logout', {headers: {Authorization: `Bearer ${user.accessToken}`}});

            if(data){
                dispatch(toggleIsUserLoggedIn(false));
                dispatch(updateUser({}));
                dispatch(updateHotel({}));
                navigate('/');
                toast.success(data.message);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className="relative w-full">
            {
                !user.image
                    ?
                    (<FontAwesomeIcon icon={faUserCircle} className="text-3xl text-black p-2 cursor-pointer hover:text-gray-600 transition-colors duration-200 float-end" onClick={() => setShowUserMenu(!showUserMenu)} />)
                    :
                    (<img src={user.image} alt="userImg" className="h-10 w-10 object-cover rounded-full float-end border-2 border-blue-200 cursor-pointer" onClick={() => setShowUserMenu(!showUserMenu)} />)
            }

            <div className={`${!showUserMenu && 'hidden'} absolute right-0 top-full translate-y-4 bg-white border-2 border-blue-100 rounded drop-shadow-md drop-shadow-blue-200 min-w-48`} onClick={() => setShowUserMenu(!showUserMenu)}>
                <ul className="py-4">
                    <li>
                        <Link to="/user/profile" className="flex gap-2 items-center cursor-pointer px-5 py-1">
                            <FontAwesomeIcon icon={faUser} />
                            <span>{user.fullName || 'User'}</span>
                        </Link>
                    </li>
                    {
                        isHotelOwner
                        &&
                        <li>
                            <Link to="/owner/dashboard" className="flex gap-2 items-center cursor-pointer px-5 py-1">
                                <FontAwesomeIcon icon={faHotel} />
                                <span>Hotel</span>
                            </Link>
                        </li>
                    }
                    {
                        !isHotelOwner
                        &&
                        <li className="flex gap-2 items-center cursor-pointer px-5 py-1" onClick={() => dispatch(toggleShowHotelRegForm(true))}>
                            <FontAwesomeIcon icon={faHotel} />
                            <span>Add Hotel</span>
                        </li>
                    }
                    <li className="flex gap-2 items-center cursor-pointer px-5 py-1" onClick={logoutHandler}>
                        <FontAwesomeIcon icon={faSignOut} />
                        <span>Log Out</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default UserMenuIcon;