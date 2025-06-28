import { useForm } from "react-hook-form";
import { GoogleOAuth, Input, SocialAuthButton } from "./";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toggleIsUserLoggedIn, toggleShowUserAuthForm, updateUser } from "../features/forms/UserAuthSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function UserRegForm({isLoginActive, setIsLoginActive}){
    const {register, handleSubmit} = useForm({defaultValues:{
        fullName:'',
        email:'',
        phone:'',
        password:''
    }});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const registerFormHandler = async (formData) => {
        try {
            const {data} = await axios.post(`/api/v1/users/register`, {fullName:formData.fullName, email:formData.email, phone:formData.phone, password:formData.password});

            if(data){
                const accessToken = data.data.accessToken;
                dispatch(updateUser({...data.data.user, accessToken}));
                dispatch(toggleIsUserLoggedIn(true));
                dispatch(toggleShowUserAuthForm(false));
                toast.success(data.message);
                navigate('/user/dashboard');
            }
        } catch (error) {
            console.error(error.message);
            toast.error(error.response.data.message);
        }
    }

    return (
        <section className={`w-1/2 ${isLoginActive && 'translate-x-10'}`}>
            <form onSubmit={handleSubmit(registerFormHandler)}>
                <h3 className="text-2xl text-center my-5">Register</h3>

                <Input type="text" placeholder="Full Name" className="focus-within:outline-2 focus-within:outline-blue-300" {...register('fullName', {required:true})} />

                <Input type="email" placeholder="E-mail" className="focus-within:outline-2 focus-within:outline-blue-300" {...register('email', {required:true})} />

                <Input type="tel" placeholder="Phone No." className="focus-within:outline-2 focus-within:outline-blue-300" {...register('phone', {required:false})} />

                <Input type="password" placeholder="Password" className="focus-within:outline-2 focus-within:outline-blue-300" {...register('password', {required:true})} />

                <button className="w-full bg-blue-500 py-2 text-white rounded cursor-pointer my-2 font-light" type="submit">Register</button>

                <p className="text-sm font-light text-gray-600">Already have an account? <span to="" className="underline text-blue-500 cursor-pointer" onClick={() => setIsLoginActive(true)}>Login</span></p>

                <br />

                <SocialAuthButton icon="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" name="Register with Google" className="bg-blue-50 border-2 border-blue-100" link={GoogleOAuth()} />

                <SocialAuthButton icon="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png" name="Register with Apple" className="bg-black border-2 border-black text-white" />
            </form>
        </section>
    );
}

export default UserRegForm;