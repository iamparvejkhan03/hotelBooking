import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleIsHotelOwner, toggleIsUserLoggedIn, toggleShowUserAuthForm, updateUser } from "../features/forms/UserAuthSlice";
import { useNavigate } from "react-router-dom";
import { updateHotel } from "../features/forms/HotelRegSlice";

function GoogleOAuth() {
    const location = useLocation();
    const hash = location.hash.split('&')[0];
    const google_access_token = hash.split('=')[1];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const googleRegistration = async () => {
            try {
                const { data } = await axios.post('/api/v1/users/google-oauth', { google_access_token });

                if (data) {
                    const accessToken = data.data.accessToken;
                    dispatch(updateUser({ ...data.data.user, accessToken }));
                    dispatch(toggleIsUserLoggedIn(true));
                    dispatch(toggleShowUserAuthForm(false));
                    if(data.hotel){
                        dispatch(updateHotel(data.hotel));
                        dispatch(toggleIsHotelOwner(true));
                    }
                    toast.success(data.message);
                    navigate('/user/dashboard');
                }
            } catch (error) {
                console.error(error);
                toast.error(error.response.data.message);
            }
        }

        googleRegistration();
    }, [hash, google_access_token])


    return (
        <>I am the Google OAuth page</>
    );
}

export default GoogleOAuth;