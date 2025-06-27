import { useForm } from "react-hook-form";
import { Input } from "./";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

function ForgotPasswordForm({isLoginActive, setIsLoginActive, isForgotPasswordActive, setIsForgotPasswordActive}){

    const user = useSelector(state => state.user.user);

    const {register, handleSubmit} = useForm({defaultValues: {
        email:user.email || ''
    }});

    const forgotPasswordHandler = async (formData) => {
        try {
            const { data } = await axios.post('/api/v1/users/forgot-password', {email:formData.email});

            if(data.success){
                toast.success(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <section className={`w-1/2 my-5 ${!isForgotPasswordActive && '-translate-x-10'}`}>
            <form onSubmit={handleSubmit(forgotPasswordHandler)}>
                <h3 className="text-2xl text-center mb-3">Forgot Password</h3>

                <Input type="email" placeholder="E-mail" className="focus-within:outline-2 focus-within:outline-blue-300" {...register('email', {required:true})} />

                <p className="text-blue-500 text-sm underline font-light cursor-pointer inline float-right" onClick={() => {setIsLoginActive(true); setIsForgotPasswordActive(false);}}>
                    Remember Password?
                </p>

                <button className="w-full bg-blue-500 py-2 text-white rounded cursor-pointer my-2 font-light" type="submit">Send Reset Link</button>

                <p className="text-sm font-light text-gray-600">Don't have an account? <span to="" className="underline text-blue-500 cursor-pointer" onClick={() => {setIsLoginActive(false); setIsForgotPasswordActive(false);}}>Sign up</span></p>

                <br />

                <button className="w-full bg-blue-50 border-2 border-blue-100 py-2 rounded cursor-pointer my-2 font-light" type="submit">
                    <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="google logo" className="h-5 inline mx-2 align-middle" />
                    <span className="align-middle">Login with Google</span>
                </button>

                <button className="w-full bg-black border-2 border-black text-white py-2 rounded cursor-pointer my-2 font-light" type="submit">
                    <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png" alt="google logo" className="h-5 inline mx-2 align-middle" />
                    <span className="align-middle">Login with Apple</span>
                </button>
            </form>
        </section>
    );
}

export default ForgotPasswordForm;